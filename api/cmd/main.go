package main

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/auth"
	"github.com/a-Ksy/Planning-Poker/backend/internal/room"
	db "github.com/a-Ksy/Planning-Poker/backend/pkg/dbcontext"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
)

var (
	logger         log.Logger      = log.New()
	database       db.DBContext    = db.SetupDatabaseConnection()
	roomRepository room.Repository = room.NewRoomRepository(database, logger)
	roomService    room.Service    = room.NewRoomService(roomRepository, logger)
	roomController room.Controller = room.NewRoomController(roomService, logger)
)

func main() {
	defer database.Close()

	r := gin.Default()
	r.Use(cors.Default())

	// authRoutes.Use(middleware.MiddlewareFunc())
	roomRoutes := r.Group("api/room")
	{
		roomRoutes.POST("/", roomController.CreateRoom)
		roomRoutes.GET("/:id", auth.CheckAuthToken, roomController.GetRoom)
		roomRoutes.POST("/:id", roomController.JoinRoom)
	}

	r.Run()
}
