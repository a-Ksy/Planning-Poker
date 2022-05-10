package room

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/a-Ksy/Planning-Poker/backend/internal/vote"
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

const (
	dummyId = "123"
	dummyIdDoesNotExist = "DOES_NOT_EXIST"
	dummyName = "my-sprint-planning"
	dummyVote = 55
)

var dummyUser *user.User

func TestMain(m *testing.M) {
	dummyUser = user.NewUser("Michael")
	code := m.Run()
	os.Exit(code)
}

func TestNewRoom(t *testing.T) {
	result := NewRoom(dummyName)
	expected := &Room{
		id:        result.id,
		name:      dummyName,
		users:     []user.User{},
		admin:     nil,
		votes:     vote.NewVotes(),
		gameState: InProgress,
	}
	assert.Equal(t, expected, result)
}

func TestNewRoomWithAdmin(t *testing.T) {
	result := NewRoomWithAdmin(dummyName, dummyUser)
	expected := &Room{
		id:        result.id,
		name:      dummyName,
		users:     []user.User{*dummyUser},
		admin:     dummyUser,
		votes:     vote.NewVotes(),
		gameState: InProgress,
	}
	assert.Equal(t, expected, result)
}

func TestGetId(t *testing.T) {
	room := Room{id: dummyId}
	assert.Equal(t, room.id, room.GetId())
}

func TestGetName(t *testing.T) {
	room := Room{name: dummyName}
	assert.Equal(t, room.name, room.GetName())
}

func TestAddUser(t *testing.T) {
	expected := Room{users: []user.User{*dummyUser}}
	room := Room{}
	room.AddUser(dummyUser)
	assert.Equal(t, expected, room)
}

func TestIsFull(t *testing.T) {
	room := Room{}
	for i := 0 ; i < maxUsers; i++ {
		assert.False(t, room.IsFull())
		room.users = append(room.users, *dummyUser)
	}
	room.users = append(room.users, *dummyUser)
	assert.True(t, room.IsFull())
}

func TestGetUserWithId(t *testing.T) {
	room := &Room{users: []user.User{*dummyUser}}

	user, err := room.GetUserWithId(dummyIdDoesNotExist)
	assert.Error(t, err)
	assert.Nil(t, user)

	user, err = room.GetUserWithId(dummyUser.GetId())
	assert.NoError(t, err)
	assert.Equal(t, dummyUser, user)
}

func TestGetAdmin(t *testing.T) {
	room := &Room{admin: dummyUser}
	assert.Equal(t, dummyUser, room.GetAdmin())
}

func TestSetAdmin(t *testing.T) {
	room := &Room{}
	room.SetAdmin(dummyUser)
	assert.Equal(t, dummyUser, room.admin)
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
	room.votes[dummyId] = dummyVote
	room.ResetVotes()
	assert.Empty(t, room.votes)
}

func TestString(t *testing.T) {
	room := &Room{
		id:        dummyId,
		name:      dummyName,
		users:     []user.User{},
		admin:     nil,
		votes:     vote.NewVotes(),
		gameState: InProgress,
	}
	result := room.String()
	expected := "Id: 123 Name: my-sprint-planning Users: [] Admin: <nil> Votes: map[] State: IN_PROGRESS\n"
	assert.Equal(t, expected, result)
}