package room

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/vote"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestNewRoomService(t *testing.T) {
	setupUnitTest()

	expected := &service{
		roomRepository: mockRepository,
		logger:         mockLogger,
	}

	actual := NewRoomService(mockRepository, mockLogger)
	assert.Equal(t, expected, actual)
}

func TestCreateRoom(t *testing.T) {
	setupUnitTest()

	room, err := mockService.CreateRoom(mockRoomName, mockUsername1)
	assert.NoError(t, err)
	assert.Equal(t, mockRoomName, room.GetName())
	assert.Equal(t, mockUsername1, room.GetAdmin().GetName())
}

func TestGetRoom(t *testing.T) {
	setupUnitTest()

	nonExistingRoom := NewRoom("DOESN'T EXIST")
	room, err := mockService.GetRoom(nonExistingRoom.GetId())
	assert.Error(t, err)
	assert.Nil(t, room)

	room, err = mockService.GetRoom(mockRoom.GetId())
	assert.NoError(t, err)
	assert.Equal(t, mockRoom, room)
}

func TestGetRoomWithVotesBasedOnGameState(t *testing.T) {
	setupUnitTest()

	nonExistingRoom := NewRoom(mockRoomName)
	room, err := mockService.GetRoomWithVotesBasedOnGameState(nonExistingRoom.GetId(), "12345")
	assert.Error(t, err)
	assert.Nil(t, room)

	room, err = mockService.GetRoomWithVotesBasedOnGameState(mockRoomId, mockUser1.GetId())
	assert.NoError(t, err)

	publicVote, err := room.GetVotes().GetVote(mockUser1.GetId())
	assert.NoError(t, err)
	assert.Equal(t, mockVoteValue1, publicVote)

	privateVote, err := room.GetVotes().GetVote(mockUser2.GetId())
	assert.NoError(t, err)
	assert.Equal(t, vote.Private, privateVote)
}

func TestJoinRoom(t *testing.T) {
	setupUnitTest()

	nonExistingRoom := NewRoom(mockRoomName)
	room, user, err := mockService.JoinRoom(nonExistingRoom.GetId(), mockUsername1)
	assert.Error(t, err)
	assert.Nil(t, room)
	assert.Nil(t, user)

	room, user, err = mockService.JoinRoom(mockFullRoom.GetId(), mockUsername1)
	assert.Error(t, err)
	assert.Nil(t, room)
	assert.Nil(t, user)

	room, _, err = mockService.JoinRoom(mockRoom.GetId(), mockUsername2)
	assert.NoError(t, err)
	assert.NotNil(t, room)
}

func TestSetVote(t *testing.T) {
	setupUnitTest()

	nonExistingRoom := NewRoom(mockRoomName)
	err := mockService.SetVote(nonExistingRoom.GetId(), vote.NewVote(mockUser1.GetId(), mockVoteValue1))
	assert.Error(t, err)

	err = mockService.SetVote(mockRoomId, vote.NewVote(mockUser2.GetId(), mockVoteValue2))
	assert.NoError(t, err)

	room, err := mockRepository.GetRoom(mockRoomId)
	assert.NoError(t, err)

	actualVote, err := room.GetVotes().GetVote(mockUser2.GetId())
	assert.NoError(t, err)
	assert.Equal(t, mockVoteValue2, actualVote)
}

func TestService_SetGameState(t *testing.T) {
	setupUnitTest()

	nonExistingRoom := NewRoom(mockRoomName)
	err := mockService.SetVote(nonExistingRoom.GetId(), vote.NewVote(mockUser1.GetId(), mockVoteValue1))
	assert.Error(t, err)

	err = mockService.SetGameState(mockRoomId, CardsRevealed)
	assert.NoError(t, err)

	room, err := mockRepository.GetRoom(mockRoomId)
	assert.NoError(t, err)

	actualGameState := room.GetGameState()
	assert.Equal(t, actualGameState, CardsRevealed)
}

func TestResetVotingSession(t *testing.T) {
	setupUnitTest()

	nonExistingRoom := NewRoom(mockRoomName)
	err := mockService.SetVote(nonExistingRoom.GetId(), vote.NewVote(mockUser1.GetId(), mockVoteValue1))
	assert.Error(t, err)

	err = mockService.ResetVotingSession(mockRoomId)
	assert.NoError(t, err)

	room, err := mockRepository.GetRoom(mockRoomId)
	assert.NoError(t, err)

	assert.Equal(t, room.GetVotes(), &vote.Votes{})
	assert.Equal(t, room.GetGameState(), InProgress)
}

func TestService_RemoveUser(t *testing.T) {
	setupUnitTest()

	nonExistingRoom := NewRoom(mockRoomName)
	err := mockService.RemoveUser(nonExistingRoom.GetId(), mockUser1.GetId())
	assert.Error(t, err)

	err = mockService.RemoveUser(mockRoomId, mockUser2.GetId())
	assert.NoError(t, err)

	room, err := mockService.GetRoom(mockRoomId)
	assert.NoError(t, err)

	removedUser, err := room.GetUserWithId(mockUser2.GetId())
	assert.Nil(t, removedUser)
	assert.Error(t, err)
}