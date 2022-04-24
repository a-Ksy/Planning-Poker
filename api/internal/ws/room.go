package ws

type Room struct {
	id         string
	clients    map[*Client]bool
	broadcast  chan *Message
	broadcastToOnlyOthers chan *Message
	register   chan *Client
	unregister chan *Client
}

func newRoom(id string) *Room {
	return &Room{
		id:         id,
		clients:    make(map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		broadcast:  make(chan *Message),
		broadcastToOnlyOthers: make(chan *Message),
	}
}

func (room *Room) runRoom() {
	for {
		select {
		case client := <-room.register:
			room.registerClient(client)
		case client := <-room.unregister:
			room.unregisterClient(client)
		case message := <-room.broadcast:
			room.broadcastMessage(message)
		case message := <-room.broadcastToOnlyOthers:
			room.broadcastMessageToOthers(message)
		}
	}
}

func (room *Room) registerClient(client *Client) {
	room.clients[client] = true
}

func (room *Room) unregisterClient(client *Client) {
	if _, ok := room.clients[client]; ok {
		delete(room.clients, client)
	}
}

func (room *Room) broadcastMessage(message *Message) {
	for client := range room.clients {
		client.send <- message.encode()
	}
}

func (room *Room) broadcastMessageToOthers(message *Message) {
	for client := range room.clients {
		if client.id != message.User.Id {
			client.send <- message.encode()
		}
	}
}
