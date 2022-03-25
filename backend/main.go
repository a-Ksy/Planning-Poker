package main

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/auth"
	"github.com/a-Ksy/Planning-Poker/backend/internal/room"
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	db "github.com/a-Ksy/Planning-Poker/backend/pkg/dbcontext"
	"github.com/gin-gonic/gin"
)

var (
	database       db.DBContext    = db.SetupDatabaseConnection()
	userRepository user.Repository = user.NewUserRepository(database)
	authService    auth.Service    = auth.NewAuthService(userRepository)
	authController auth.Controller = auth.NewAuthController(authService)
	authMiddleware auth.Middleware = auth.NewAuthMiddleware()
	roomRepository room.Repository = room.NewRoomRepository(database)
	roomService    room.Service    = room.NewRoomService(roomRepository)
	roomController room.Controller = room.NewRoomController(roomService)
)

func main() {
	r := gin.Default()

	middleware := authMiddleware.GetMiddleware()

	authRoutes := r.Group("api/auth")
	{
		authRoutes.POST("/register", authController.Register)
		authRoutes.GET("/login", authController.Register, middleware.LoginHandler)
	}

	authRoutes.Use(middleware.MiddlewareFunc())

	roomRoutes := r.Group("api/room")
	{
		roomRoutes.POST("/", roomController.CreateRoom)
		roomRoutes.GET("/:id", roomController.GetRoom)
	}

	r.Run()
}
