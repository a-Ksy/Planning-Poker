package room

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestNewRoomRepository(t *testing.T) {
	expected := &repository{
		db:     mockDb,
		logger: mockLogger,
	}

	result := NewRoomRepository(mockDb, mockLogger)
	assert.Equal(t, expected, result)
}

func TestRepository_CreateRoom(t *testing.T) {
	existingRoom := mockRoom
	err := mockRepository.CreateRoom(existingRoom)
	assert.Error(t, err)

	room := NewRoom(mockRoomName)
	err = mockRepository.CreateRoom(room)
	assert.NoError(t, err)
}

func TestRepository_GetRoom(t *testing.T) {
	nonExistingRoom := NewRoom("DOESN'T EXIST")
	room, err := mockRepository.GetRoom(nonExistingRoom.GetId())
	assert.Error(t, err)
	assert.Nil(t, room)

	existingRoom := mockRoom
	room, err = mockRepository.GetRoom(existingRoom.GetId())
	assert.NoError(t, err)
	assert.Equal(t, existingRoom, room)
}

func TestSetRoom(t *testing.T) {
	err := mockRepository.SetRoom(mockRoom)
	assert.NoError(t, err)
}