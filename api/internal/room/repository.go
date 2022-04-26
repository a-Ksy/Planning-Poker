package room

import (
	"errors"
	"fmt"

	db "github.com/a-Ksy/Planning-Poker/backend/pkg/dbcontext"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
)

type Repository interface {
	CreateRoom(room *Room) error
	GetRoom(roomId string) (*Room, error)
	SetRoom(room *Room) error
}

type repository struct {
	db     db.DBContext
	logger log.Logger
}

func NewRoomRepository(db db.DBContext, logger log.Logger) Repository {
	return &repository{db, logger}
}

func (r *repository) CreateRoom(newRoom *Room) error {
	if err := r.db.Get(newRoom.id, &Room{}); err == nil {
		r.logger.Error(fmt.Sprintln("Room with", newRoom.id, "already exists"))
		return errors.New(fmt.Sprintln("Room with", newRoom.id, "already exists"))
	}

	if err := r.db.Set(newRoom.id, newRoom); err != nil {
		r.logger.Error(fmt.Sprintln("Error creating a room with id", newRoom.id))
		return errors.New(fmt.Sprintln("Error creating a room with id", newRoom.id))
	}

	return nil
}

func (r *repository) GetRoom(roomId string) (*Room, error) {
	var room *Room
	if err := r.db.Get(roomId, &room); err == nil {
		return room, nil
	}
	return nil, errors.New(fmt.Sprintln("Room with id", roomId, "doesn't exist"))
}

func (r *repository) SetRoom(room *Room) error {
	if err := r.db.Set(room.id, room); err != nil {
		r.logger.Error(fmt.Sprintln("Error updating the room with id", room.id))
		return err
	}

	return nil
}
