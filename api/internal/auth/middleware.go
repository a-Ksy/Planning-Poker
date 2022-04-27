package auth

import (
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

// TODO: Put the secret into .env file
var jwtKey = []byte("my_secret_key")

func GenerateToken(user *user.User, roomId string, isAdmin bool) (Token, error) {
	expirationTime := time.Now().Add(4 * time.Hour)

	claims := &Claims{
		UserClaims: UserClaims{
			UserId:   user.GetId(),
			Username: user.GetName(),
			RoomId:   roomId,
			IsAdmin:  isAdmin,
		},
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return Token{}, err
	}

	return Token{tokenString, strconv.Itoa(int(expirationTime.Unix()))}, nil
}

func IsUserAuthorizedInRoom(ctx *gin.Context) {
	claims, err := getAllClaims(ctx)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, err.Error())
		return
	}

	roomId := ctx.Param("id")
	if claims.UserClaims.RoomId != roomId {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, "User is not authorized to GET room")
		return
	}

	ctx.Next()
}

func getAllClaims(ctx *gin.Context) (*Claims, error) {
	tknStr, ok := ctx.Request.Header["Authorization"]
	if !ok {
		return nil, errors.New("authorization token is required")
	}

	claims, err := getAllClaimsFromToken(tknStr[0])
	if err != nil {
		return nil, err
	}

	return claims, nil
}

func GetUserClaimsFromToken(token string) (*UserClaims, error) {
	claims, err := getAllClaimsFromToken(token)
	if err != nil {
		return nil, err
	}
	return &claims.UserClaims, nil
}

func getAllClaimsFromToken(token string) (*Claims, error) {
	claims := &Claims{}
	t, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil || !t.Valid {
		return nil, errors.New("authorization token is invalid")
	}
	return claims, nil
}

func GetUserId(ctx *gin.Context) (string, error) {
	claims, err := getAllClaims(ctx)
	if err != nil {
		return "", err
	}

	return claims.UserClaims.UserId, nil
}
