package auth

import "github.com/golang-jwt/jwt"

type Token struct {
	Token     string `json:"token"`
	ExpiresAt string `json:"expiresAt"`
}

type AuthUser struct {
	Id        string `json:"id"`
	RoomId    string `json:"roomId"`
	Name      string `json:"name"`
	Token     string `json:"token"`
	ExpiresAt string `json:"expiresAt"`
}

type Claims struct {
	UserClaims UserClaims
	jwt.StandardClaims
}
type UserClaims struct {
	UserId   string `json:"userId"`
	Username string `json:"username"`
	RoomId   string `json:"roomId"`
	IsAdmin  bool   `json:"isAdmin"`
}
