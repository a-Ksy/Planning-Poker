package room

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/auth"
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/a-Ksy/Planning-Poker/backend/internal/vote"
)

type RoomDto struct {
	Id    string      `json:"id"`
	Name  string      `json:"name"`
	Users []user.User `json:"users"`
	Admin *user.User   `json:"admin"`
	Votes vote.Votes `json:"votes"`
}

type RoomCreation struct {
	RoomName string `json:"roomName" validate:"required"`
	Username string `json:"username" validate:"required"`
}

type CreatedRoomWithUser struct {
	User *auth.AuthUser `json:"user"`
	Room *Room          `json:"room"`
}

type JoinRoom struct {
	RoomId   string `json:"roomId" validate:"required"`
	Username string `json:"username" validate:"required"`
}
