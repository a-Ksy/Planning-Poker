package main

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/auth"
	"github.com/a-Ksy/Planning-Poker/backend/internal/room"
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	db "github.com/a-Ksy/Planning-Poker/backend/pkg/dbcontext"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
	"github.com/gin-gonic/gin"
)

var (
	logger         log.Logger      = log.New()
	database       db.DBContext    = db.SetupDatabaseConnection()
	userRepository user.Repository = user.NewUserRepository(database, logger)
	authService    auth.Service    = auth.NewAuthService(userRepository, logger)
	authController auth.Controller = auth.NewAuthController(authService, logger)
	authMiddleware auth.Middleware = auth.NewAuthMiddleware()
	roomRepository room.Repository = room.NewRoomRepository(database, logger)
	roomService    room.Service    = room.NewRoomService(roomRepository, logger)
	roomController room.Controller = room.NewRoomController(roomService, logger)
)

func main() {
	defer database.Close()

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