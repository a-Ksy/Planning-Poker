package room

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/a-Ksy/Planning-Poker/backend/internal/vote"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestNewRoom(t *testing.T) {
	result := NewRoom(mockRoomName)
	expected := &Room{
		id:        result.id,
		name:      mockRoomName,
		users:     []user.User{},
		admin:     nil,
		votes:     vote.NewVotes(),
		gameState: InProgress,
	}
	assert.Equal(t, expected, result)
}

func TestNewRoomWithAdmin(t *testing.T) {
	result := NewRoomWithAdmin(mockRoomName, mockUser1)
	expected := &Room{
		id:        result.id,
		name:      mockRoomName,
		users:     []user.User{*mockUser1},
		admin:     mockUser1,
		votes:     vote.NewVotes(),
		gameState: InProgress,
	}
	assert.Equal(t, expected, result)
}

func TestGetId(t *testing.T) {
	room := Room{id: mockRoomId}
	assert.Equal(t, room.id, room.GetId())
}

func TestGetName(t *testing.T) {
	room := Room{name: mockRoomName}
	assert.Equal(t, room.name, room.GetName())
}

func TestAddUser(t *testing.T) {
	expected := Room{users: []user.User{*mockUser1}}
	room := Room{}
	room.AddUser(mockUser1)
	assert.Equal(t, expected, room)
}

func TestRemoveUser(t *testing.T) {
	room := Room{users: []user.User{*mockUser1}, admin: mockUser1, votes: vote.NewVotes()}
	room.votes.SetVote(vote.NewVote(mockUser1.GetId(), mockVoteValue2))

	expected := Room{users: []user.User{}, admin: nil, votes: vote.NewVotes()}

	room.RemoveUser(mockUser1.GetId())
	assert.Equal(t, expected, room)
}

func TestIsFull(t *testing.T) {
	room := Room{}
	for i := 0; i < maxUsers; i++ {
		assert.False(t, room.IsFull())
		room.users = append(room.users, *mockUser1)
	}
	room.users = append(room.users, *mockUser1)
	assert.True(t, room.IsFull())
}

func TestGetUserWithId(t *testing.T) {
	room := &Room{users: []user.User{*mockUser1}}

	user, err := room.GetUserWithId(dummyIdDoesNotExist)
	assert.Error(t, err)
	assert.Nil(t, user)

	user, err = room.GetUserWithId(mockUser1.GetId())
	assert.NoError(t, err)
	assert.Equal(t, mockUser1, user)
}

func TestGetAdmin(t *testing.T) {
	room := &Room{admin: mockUser1}
	assert.Equal(t, mockUser1, room.GetAdmin())
}

func TestSetAdmin(t *testing.T) {
	room := &Room{}
	room.SetAdmin(mockUser1)
	assert.Equal(t, mockUser1, room.admin)
}

func TestGetVotes(t *testing.T) {
	votes := vote.NewVotes()
	room := &Room{votes: votes}
	assert.Equal(t, &votes, room.GetVotes())
}

func TestGetGameState(t *testing.T) {
	room := &Room{gameState: InProgress}
	assert.Equal(t, InProgress, room.GetGameState())
}

func TestSetGameState(t *testing.T) {
	expected := &Room{gameState: InProgress}
	room := &Room{}
	room.SetGameState(InProgress)
	assert.Equal(t, expected, room)
}

func TestResetVotes(t *testing.T) {
	room := &Room{votes: vote.NewVotes()}
	room.votes[mockRoomId] = mockVoteValue1
	room.ResetVotes()
	assert.Empty(t, room.votes)
}

func TestString(t *testing.T) {
	room := &Room{
		id:        mockRoomId,
		name:      mockRoomName,
		users:     []user.User{},
		admin:     nil,
		votes:     vote.NewVotes(),
		gameState: InProgress,
	}
	result := room.String()
	expected := "Id: 1 Name: sprint-planning Users: [] Admin: <nil> Votes: map[] State: IN_PROGRESS\n"
	assert.Equal(t, expected, result)
}
