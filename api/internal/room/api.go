package room

import (
	"fmt"
	"net/http"

	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
	"github.com/gin-gonic/gin"
)

type Controller interface {
	CreateRoom(ctx *gin.Context)
	GetRoom(ctx *gin.Context)
}

type controller struct {
	service Service
	logger  log.Logger
}

func NewRoomController(service Service, logger log.Logger) Controller {
	return &controller{service, logger}
}

func (c *controller) CreateRoom(ctx *gin.Context) {
	var roomCreation RoomCreation
	if err := ctx.BindJSON(&roomCreation); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, "Invalid request body")
		return
	}
	c.logger.Info(fmt.Sprintln("CreateRoom called with roomName:", roomCreation.RoomName))

	room, err := c.service.CreateRoom(roomCreation.RoomName)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusConflict, err)
		return
	}

	c.logger.Info(fmt.Sprintln("Created room:", room))
	ctx.AbortWithStatusJSON(http.StatusCreated, room)
}

// TODO: Only authorized people for this room should be able to retrieve data
func (c *controller) GetRoom(ctx *gin.Context) {
	roomId := ctx.Param("id")
	c.logger.Info(fmt.Sprintln("GetRoom called with roomId:", roomId))
	room, err := c.service.GetRoom(roomId)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusNotFound, err)
		return
	}

	c.logger.Info(fmt.Sprintln("Found room:", room))
	ctx.AbortWithStatusJSON(http.StatusOK, room)
}
