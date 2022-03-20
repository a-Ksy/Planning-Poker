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
	authMiddleware auth.Middleware = auth.NewAuthMiddleware()
)

func main() {
	r := gin.Default()

	middleware := authMiddleware.GetMiddleware()

	authRoutes := r.Group("api/auth")
	{
		authRoutes.GET("/login", authController.Register, middleware.LoginHandler)
	}

	authRoutes.Use(middleware.MiddlewareFunc())

	r.Run()
}
