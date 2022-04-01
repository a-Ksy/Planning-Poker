package room

import (
	"encoding/json"
	"errors"
	"fmt"

	db "github.com/a-Ksy/Planning-Poker/backend/pkg/dbcontext"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
)

type Repository interface {
	CreateRoom(room Room) error
	GetRoom(roomId string) (Room, error)
}

type repository struct {
	db     db.DBContext
	logger log.Logger
}

func NewRoomRepository(db db.DBContext, logger log.Logger) Repository {
	return &repository{db, logger}
}

func (r *repository) CreateRoom(newRoom Room) error {
	if err := r.db.Get(newRoom.Id, &Room{}); err == nil {
		r.logger.Error(fmt.Sprintln("Room with", newRoom.Id, "already exists"))
		return errors.New(fmt.Sprintln("Room with", newRoom.Id, "already exists"))
	}

	jsonData, err := json.Marshal(newRoom)
	if err != nil {
		return err
	}

	if err := r.db.Set(newRoom.Id, jsonData); err != nil {
		fmt.Sprintln(fmt.Sprintln("Error creating a room with id", newRoom.Id))
		return errors.New(fmt.Sprintln("Error creating a room with id", newRoom.Id))
	}

	return nil
}

func (r *repository) GetRoom(roomId string) (Room, error) {
	var room Room
	if err := r.db.Get(roomId, &room); err == nil {
		return room, nil
	}
	return Room{}, errors.New(fmt.Sprintln("Room with id", roomId, "doesn't exist"))
}
