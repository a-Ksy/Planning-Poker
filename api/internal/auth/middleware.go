package auth

import (
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

// TODO: Put the secret into .env file
var jwtKey = []byte("my_secret_key")

type Claims struct {
	UserId  string `json:"userId"`
	RoomId  string `json:"roomId"`
	IsAdmin bool   `json:"isAdmin"`
	jwt.StandardClaims
}

func GenerateToken(ctx *gin.Context, userId string, roomId string, isAdmin bool) (Token, error) {
	expirationTime := time.Now().Add(4 * time.Hour)

	claims := &Claims{
		UserId:  userId,
		RoomId:  roomId,
		IsAdmin: isAdmin,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return Token{}, err
	}

	return Token{tokenString, expirationTime.String()}, nil
}

func CheckAuthToken(ctx *gin.Context) {
	_, err := getClaims(ctx)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, err.Error())
		return
	}

	ctx.Next()
}

func IsUserAuthorizedInRoom(ctx *gin.Context) {
	claims, err := getClaims(ctx)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, err.Error())
		return
	}

	roomId := ctx.Param("id")
	if claims.RoomId != roomId {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, "User is not authorized to GET room")
		return
	}

	ctx.Next()
}

func getClaims(ctx *gin.Context) (*Claims, error) {
	tknStr, ok := ctx.Request.Header["Authorization"]
	if !ok {
		return nil, errors.New("authorization token is required")
	}

	claims := &Claims{}

	t, err := jwt.ParseWithClaims(tknStr[0], claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil || !t.Valid {
		return nil, errors.New("authorization token is invalid")
	}

	return claims, nil
}
