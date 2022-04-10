package room

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/auth"
)

type RoomCreation struct {
	RoomName string `json:"roomName" validate:"required"`
	Username string `json:"username" validate:"required"`
}

type CreatedRoomWithUser struct {
	User auth.UserWithToken `json:"user"`
	Room Room               `json:"room"`
}
