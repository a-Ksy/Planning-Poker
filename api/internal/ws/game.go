package ws

type Game struct {
	id         string
	clients    map[*Client]bool
	broadcast  chan *Message
	broadcastToOnlyOthers chan *Message
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
		broadcastToOnlyOthers: make(chan *Message),
	}
}

func (game *Game) runGame() {
	for {
		select {
		case client := <-game.register:
			game.registerClient(client)
		case client := <-game.unregister:
			game.unregisterClient(client)
		case message := <-game.broadcast:
			game.broadcastMessage(message)
		case message := <-game.broadcastToOnlyOthers:
			game.broadcastMessageToOthers(message)
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

func (game *Game) broadcastMessage(message *Message) {
	for client := range game.clients {
		client.send <- message.encode()
	}
}

func (game *Game) broadcastMessageToOthers(message *Message) {
	for client := range game.clients {
		if client.id != message.User.GetId() {
			client.send <- message.encode()
		}
	}
}
