package room

import (
	"fmt"
	"net/http"

	"github.com/a-Ksy/Planning-Poker/backend/internal/auth"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

type Controller interface {
	CreateRoom(ctx *gin.Context)
	JoinRoom(ctx *gin.Context)
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

	err := validate.Struct(roomCreation)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, "'roomName' or 'username' field is either not provided or not valid.")
		return
	}
	c.logger.Info(fmt.Sprintln("CreateRoom called with roomName:", roomCreation.RoomName, "and admin username:", roomCreation.Username))

	room, err := c.service.CreateRoom(roomCreation.RoomName, roomCreation.Username)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusConflict, err)
		return
	}
	c.logger.Info(fmt.Sprintln("Created room:", room))

	t, err := auth.GenerateToken(room.GetAdmin(), room.GetId(), true)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, err)
		return
	}

	ctx.AbortWithStatusJSON(http.StatusCreated,
		CreatedRoomWithUser{
			&auth.AuthUser{
				Id:        room.GetAdmin().GetId(),
				RoomId:    room.GetId(),
				Name:      room.GetAdmin().GetName(),
				Token:     t.Token,
				ExpiresAt: t.ExpiresAt},
			room})
}

func (c *controller) GetRoom(ctx *gin.Context) {
	roomId := ctx.Param("id")
	c.logger.Info(fmt.Sprintln("GetRoom called with roomId:", roomId))

	if roomId == "" {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, "'roomId' should be provided")
		return
	}

	userId, _ := auth.GetUserId(ctx)
	fmt.Println("userId is", userId)

	room, err := c.service.GetRoomWithVotesBasedOnGameState(roomId, userId)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusNotFound, err)
		return
	}

	_, err = room.GetUserWithId(userId)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, err)
	}

	c.logger.Info(fmt.Sprintln("Found room:", room))
	ctx.AbortWithStatusJSON(http.StatusOK, &room)
}

func (c *controller) JoinRoom(ctx *gin.Context) {
	var joinRoom JoinRoom
	if err := ctx.BindJSON(&joinRoom); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, "Invalid request body")
		return
	}

	err := validate.Struct(joinRoom)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, "'roomId' or 'username' field is not provided")
		return
	}

	c.logger.Info(fmt.Sprintln("JoinRoom called with roomId:", joinRoom.RoomId, "and username:", joinRoom.Username))
	room, user, err := c.service.JoinRoom(joinRoom.RoomId, joinRoom.Username)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusConflict, err)
		return
	}
	c.logger.Info(fmt.Sprintln("User:", user, "has joined the room:", room))

	t, err := auth.GenerateToken(user, room.GetId(), false)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, err)
		return
	}

	ctx.AbortWithStatusJSON(http.StatusOK,
		CreatedRoomWithUser{
			&auth.AuthUser{
				Id:        user.GetId(),
				RoomId:    room.GetId(),
				Name:      user.GetName(),
				Token:     t.Token,
				ExpiresAt: t.ExpiresAt},
			room})
}

func init() {
	validate = validator.New()
}
