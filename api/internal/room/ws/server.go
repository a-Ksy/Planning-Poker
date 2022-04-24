package ws

type WSServer struct {
	rooms map[*Room]bool
}

func NewWSServer() *WSServer {
	return &WSServer{
		rooms: make(map[*Room]bool),
	}
}

func (s *WSServer) findRoomById(id string) *Room {
	var foundRoom *Room
	for r := range s.rooms {
		if r.id == id {
			foundRoom = r
			break
		}
	}
	return foundRoom
}

func (s *WSServer) createRoom(roomId string) *Room {
	room := newRoom(roomId)
	go room.runRoom()
	s.rooms[room] = true
	return room
}
