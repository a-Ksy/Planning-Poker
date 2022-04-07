package room

import (
	"fmt"

	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
	"github.com/google/uuid"
)

type Service interface {
	CreateRoom(roomName string, adminUsername string) (Room, error)
	GetRoom(roomId string) (Room, error)
}

type service struct {
	roomRepository Repository
	logger         log.Logger
}

func NewRoomService(roomRepository Repository, logger log.Logger) Service {
	return &service{roomRepository, logger}
}

func (s *service) CreateRoom(roomName string, adminUsername string) (Room, error) {
	newRoom := Room{
		Id: uuid.New().String(), Name: roomName,
		Admin: user.User{Id: uuid.New().String(), Name: adminUsername}}
	if err := s.roomRepository.CreateRoom(newRoom); err != nil {
		return Room{}, err
	}
	return newRoom, nil
}

func (s *service) GetRoom(roomId string) (Room, error) {
	room, err := s.roomRepository.GetRoom(roomId)
	if err != nil {
		s.logger.Error(fmt.Sprintln("Room with roomId:", roomId, "not found."))
		return Room{}, err
	}

	return room, nil
}
