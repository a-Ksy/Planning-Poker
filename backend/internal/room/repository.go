package room

import (
	"encoding/json"
	"errors"
	"fmt"

	db "github.com/a-Ksy/Planning-Poker/backend/pkg/dbcontext"
)

type Repository interface {
	CreateRoom(room Room) error
	GetRoom(roomId string) (Room, error)
}

type repository struct {
	db db.DBContext
}

func NewRoomRepository(db db.DBContext) Repository {
	return &repository{db}
}

func (r *repository) CreateRoom(newRoom Room) error {
	if err := r.db.Get(newRoom.Id, &Room{}); err == nil {
		return errors.New(fmt.Sprintln("Room with", newRoom.Id, "already exists"))
	}

	jsonData, err := json.Marshal(newRoom)
	if err != nil {
		return err
	}

	if err := r.db.Set(newRoom.Id, jsonData); err != nil {
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
