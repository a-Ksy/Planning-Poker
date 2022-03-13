package main

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/auth"
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/gin-gonic/gin"
)

var (
	userRepository user.Repository = user.NewUserRepository()
	authService    auth.Service    = auth.NewAuthService(userRepository)
	authController auth.Controller = auth.NewAuthController(authService)
)

func main() {
	r := gin.Default()

	authRoutes := r.Group("api/auth")
	{
		authRoutes.GET("/register", authController.Register)
	}

	r.Run()
}
