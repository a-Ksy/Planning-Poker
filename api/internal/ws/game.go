package ws

import (
	"context"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/config"
	"sync"
	"time"
)

const (
	maxAFKDuration = 2 * time.Minute
)

type Game struct {
	id         string
	clients    map[*Client]bool
	broadcast  chan *Message
	register   chan *Client
	unregister chan *Client
	setAFK     chan *Client
	mu         sync.Mutex
}

func newGame(id string) *Game {
	return &Game{
		id:         id,
		clients:    make(map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		setAFK:     make(chan *Client),
		broadcast:  make(chan *Message),
	}
}

func (game *Game) runGame() {
	go game.subscribe()
	// go game.disconnectAFKs()

	for {
		select {
		case client := <-game.register:
			game.registerClient(client)
		case client := <-game.unregister:
			game.unregisterClient(client)
		case client := <-game.setAFK:
			game.setClientAFK(client)
		case message := <-game.broadcast:
			game.publish(message.encode())
		}
	}
}

func (game *Game) registerClient(client *Client) {
	game.mu.Lock()
	defer game.mu.Unlock()

	game.clients[client] = true
	for c, isOnline := range game.clients {
		if c.id == client.id && c.conn != client.conn {
			game.unregisterClient(c)
			continue
		}

		if !isOnline {
			afkMessage := &Message{
				Action:   IsAFKAction,
				ClientId: c.id,
			}

			client.send <- afkMessage.encode()
		}
	}
}

func (game *Game) unregisterClient(client *Client) {
	if _, ok := game.clients[client]; ok {
		delete(game.clients, client)
	}
}

func (game *Game) setClientAFK(client *Client) {
	game.mu.Lock()
	defer game.mu.Unlock()

	game.clients[client] = false
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
	for client, isOnline := range game.clients {
		if isOnline {
			client.send <- message
		}
	}
}

func (game *Game) disconnectAFKs() {
	for client, isOnline := range game.clients {
		if !isOnline {
			client.disconnect()
			// todo: remove from game
		}
	}
	time.Sleep(maxAFKDuration)
}
