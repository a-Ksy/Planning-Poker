package ws

import (
	"context"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/config"
)

type Game struct {
	id         string
	clients    map[*Client]bool
	broadcast  chan *Message
	register   chan *Client
	unregister chan *Client
}

func newGame(id string) *Game {
	return &Game{
		id:         id,
		clients:    make(map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		broadcast:  make(chan *Message),
	}
}

func (game *Game) runGame() {
	go game.subscribe()
	for {
		select {
		case client := <-game.register:
			game.registerClient(client)
		case client := <-game.unregister:
			game.unregisterClient(client)
		case message := <-game.broadcast:
			game.publish(message.encode())
		}
	}
}

func (game *Game) registerClient(client *Client) {
	game.clients[client] = true
}

func (game *Game) unregisterClient(client *Client) {
	if _, ok := game.clients[client]; ok {
		delete(game.clients, client)
	}
}

func (game *Game) publish(message []byte) {
	config.GetPubSubClient().Publish(context.Background(), game.id, message)
}

func (game *Game) subscribe() {
	pubSub := config.GetPubSubClient().Subscribe(context.Background(), game.id)
	ch := pubSub.Channel()

	for msg := range ch {
		game.broadcastMessage([]byte(msg.Payload))
	}
}

func (game *Game) broadcastMessage(message []byte) {
	for client := range game.clients {
		client.send <- message
	}
}
