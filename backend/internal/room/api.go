package room

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Controller interface {
	CreateRoom(ctx *gin.Context)
	GetRoom(ctx *gin.Context)
}

type controller struct {
	service Service
}

func NewRoomController(service Service) Controller {
	return &controller{service}
}

func (c *controller) CreateRoom(ctx *gin.Context) {
	var roomCreation RoomCreation
	if err := ctx.BindJSON(&roomCreation); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, "Invalid request body")
		return
	}

	room, err := c.service.CreateRoom(roomCreation.RoomName)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusConflict, err)
		return
	}

	ctx.AbortWithStatusJSON(http.StatusCreated, room)
}

// TODO: Only authorized people for this room should be able to retrieve data
func (c *controller) GetRoom(ctx *gin.Context) {
	roomId := ctx.Param("id")

	room, err := c.service.GetRoom(roomId)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusNotFound, err)
		return
	}

	ctx.AbortWithStatusJSON(http.StatusOK, room)
}
