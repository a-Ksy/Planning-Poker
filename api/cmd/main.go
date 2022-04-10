package main

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/auth"
	"github.com/a-Ksy/Planning-Poker/backend/internal/room"
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	db "github.com/a-Ksy/Planning-Poker/backend/pkg/dbcontext"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
)

var (
	logger         log.Logger      = log.New()
	database       db.DBContext    = db.SetupDatabaseConnection()
	userRepository user.Repository = user.NewUserRepository(database, logger)
	authService    auth.Service    = auth.NewAuthService(userRepository, logger)
	authController auth.Controller = auth.NewAuthController(authService, logger)
	roomRepository room.Repository = room.NewRoomRepository(database, logger)
	roomService    room.Service    = room.NewRoomService(roomRepository, logger)
	roomController room.Controller = room.NewRoomController(roomService, logger)
)

func main() {
	defer database.Close()

	r := gin.Default()
	r.Use(cors.Default())

	authRoutes := r.Group("api/auth")
	{
		authRoutes.POST("/register", authController.Register)
		// authRoutes.GET("/login", middleware.LoginHandler, middleware.LoginHandler)
	}

	// authRoutes.Use(middleware.MiddlewareFunc())

	roomRoutes := r.Group("api/room")
	{
		roomRoutes.POST("/", roomController.CreateRoom)
		roomRoutes.GET("/:id", roomController.GetRoom)
	}

	r.Run()
}
