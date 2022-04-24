package ws

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/a-Ksy/Planning-Poker/backend/internal/auth"
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/gorilla/websocket"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 10000
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  4096,
	WriteBufferSize: 4096,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

type Client struct {
	id       string
	room     *Room
	conn     *websocket.Conn
	send     chan []byte
	wsServer *WSServer
}

func newClient(conn *websocket.Conn, wsServer *WSServer, id string, room *Room) *Client {
	return &Client{
		id:       id,
		room:     room,
		conn:     conn,
		wsServer: wsServer,
		send:     make(chan []byte, 256),
	}
}

func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The WsServer closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// Attach queued chat messages to the current websocket message.
			n := len(c.send)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-c.send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func (c *Client) readPump() {
	defer func() {
		c.disconnect()
	}()

	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	// Start endless read loop, waiting for messages from client
	for {
		_, jsonMessage, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("unexpected close error: %v", err)
			}
			break
		}

		var message Message
		if err := json.Unmarshal(jsonMessage, &message); err != nil {
			log.Printf("Error on unmarshal JSON message %s", err)
			return
		}

		c.send <- message.encode()
	}
}

func (c *Client) disconnect() {
	c.room.unregister <- c
	close(c.send)
	c.conn.Close()
}

func ServeWS(wsServer *WSServer, w http.ResponseWriter, r *http.Request, claims *auth.UserClaims) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}

	client := newClient(conn, wsServer, claims.UserId, nil)
	client.joinRoom(claims.RoomId, &user.User{Id: claims.UserId, Name: claims.Username})

	go client.readPump()
	go client.writePump()
}

func (c *Client) joinRoom(roomId string, user *user.User) {
	room := c.wsServer.findRoomById(roomId)
	if room == nil {
		room = c.wsServer.createRoom(roomId)
	}

	if c.room == nil {
		c.room = room
		room.register <- c
		// TODO: Don't broadcast the message if the userId is already in the room

		room.broadcast <- &Message{Action: RoomJoinedAction, User: user}
	}
}
