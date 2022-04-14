package room

import (
	"fmt"

	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
	"github.com/google/uuid"
)

type Service interface {
	CreateRoom(roomName, adminUsername string) (Room, error)
	GetRoom(roomId string) (Room, error)
	JoinRoom(roomId, username string) (Room, user.User, error)
}

type service struct {
	roomRepository Repository
	logger         log.Logger
}

func NewRoomService(roomRepository Repository, logger log.Logger) Service {
	return &service{roomRepository, logger}
}

func (s *service) CreateRoom(roomName string, adminUsername string) (Room, error) {
	newUser := user.User{Id: uuid.New().String(), Name: adminUsername}
	newRoom := Room{
		Id: uuid.New().String(), Name: roomName,
		Users: []user.User{newUser},
		Admin: newUser}
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

func (s *service) JoinRoom(roomId, username string) (Room, user.User, error) {
	room, err := s.GetRoom(roomId)
	if err != nil {
		s.logger.Info(fmt.Sprintln("Room with roomId:", roomId, "not found."))
		return Room{}, user.User{}, err
	}

	user := user.User{Id: uuid.New().String(), Name: username}
	room.Users = append(room.Users, user)
	if err := s.roomRepository.SetRoom(room); err != nil {
		return Room{}, user, err
	}

	return room, user, nil
}
