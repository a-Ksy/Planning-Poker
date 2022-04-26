package room

import (
	"fmt"

	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
)

type Service interface {
	CreateRoom(roomName, adminUsername string) (*Room, error)
	GetRoom(roomId string) (*Room, error)
	JoinRoom(roomId, username string) (*Room, *user.User, error)
}

type service struct {
	roomRepository Repository
	logger         log.Logger
}

func NewRoomService(roomRepository Repository, logger log.Logger) Service {
	return &service{roomRepository, logger}
}

func (s *service) CreateRoom(roomName string, adminUsername string) (*Room, error) {
	admin := user.NewUser(adminUsername)
	newRoom := NewRoomWithAdmin(roomName, admin)
	if err := s.roomRepository.CreateRoom(newRoom); err != nil {
		return nil, err
	}
	return newRoom, nil
}

func (s *service) GetRoom(roomId string) (*Room, error) {
	room, err := s.roomRepository.GetRoom(roomId)
	if err != nil {
		s.logger.Error(fmt.Sprintln("Room with roomId:", roomId, "not found."))
		return nil, err
	}

	return room, nil
}

func (s *service) JoinRoom(roomId, username string) (*Room, *user.User, error) {
	room, err := s.GetRoom(roomId)
	if err != nil {
		s.logger.Info(fmt.Sprintln("Room with roomId:", roomId, "not found."))
		return nil, nil, err
	}

	user := user.NewUser(username)
	room.AddUser(user)
	if err := s.roomRepository.SetRoom(room); err != nil {
		return nil, nil, err
	}

	return room, user, nil
}
