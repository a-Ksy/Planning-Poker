package ws

import (
	"encoding/json"
	"log"
)

const (
	RoomJoinedAction       = "room-joined"
	VoteSubmittedAction    = "vote-submitted"
	CardsRevealedAction    = "cards-revealed"
	RevealCardsAction      = "reveal-cards"
	StartNewVotingAction   = "start-new-voting"
	NewVotingStartedAction = "new-voting-started"
	IsAFKAction            = "is-afk"
	DisconnectedAction     = "disconnected"
	KickAction             = "kick"
)

type Message struct {
	Action   string `json:"action"`
	ClientId string `json:"clientId"`
	Message  string `json:"message"`
}

func (message *Message) encode() []byte {
	json, err := json.Marshal(message)
	if err != nil {
		log.Println(err)
	}

	return json
}
