package auth

import (
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
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

func AuthHandler(ctx *gin.Context) {
	tknStr, ok := ctx.Request.Header["Authorization"]
	if !ok {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, "Authorization token is required")
		return
	}

	claims := &Claims{}

	t, err := jwt.ParseWithClaims(tknStr[0], claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil || !t.Valid {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, "Authorization token is invalid")
	}

	ctx.Next()
}
