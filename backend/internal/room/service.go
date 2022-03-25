package room

import (
	"github.com/google/uuid"
)

type Service interface {
	CreateRoom(roomName string) (Room, error)
	GetRoom(roomId string) (Room, error)
}

type service struct {
	roomRepository Repository
}

func NewRoomService(roomRepository Repository) Service {
	return &service{roomRepository}
}

func (s *service) CreateRoom(roomName string) (Room, error) {
	newRoom := Room{Id: uuid.New().String(), Name: roomName}
	if err := s.roomRepository.CreateRoom(newRoom); err != nil {
		return Room{}, err
	}
	return newRoom, nil
}

func (s *service) GetRoom(roomId string) (Room, error) {
	room, err := s.roomRepository.GetRoom(roomId)
	if err != nil {
		return Room{}, err
	}

	return room, nil
}
