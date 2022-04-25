package ws

import (
	"encoding/json"
	"log"

	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
)

const RoomJoinedAction = "room-joined"
const VoteSubmittedAction = "vote-submitted"

type Message struct {
	Action  string     `json:"action"`
	User    *user.User `json:"user"`
	Message string     `json:"message"`
}

func (message *Message) encode() []byte {
	json, err := json.Marshal(message)
	if err != nil {
		log.Println(err)
	}

	return json
}
