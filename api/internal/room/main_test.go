package room

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/a-Ksy/Planning-Poker/backend/internal/vote"
	db "github.com/a-Ksy/Planning-Poker/backend/pkg/dbcontext"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
	"os"
	"testing"
)

const (
	mockRoomId = "123"
	mockRoomName = "sprint-planning"
	dummyIdDoesNotExist = "DOES_NOT_EXIST"
	dummyName = "my-sprint-planning"
	dummyVote = 55
)

var dummyUser = user.NewUser("Michael")

var mockRoom = &Room{
	id:        mockRoomId,
	name:      mockRoomName,
	users:     []user.User{*dummyUser},
	admin:     dummyUser,
	votes:     vote.NewVotes(),
	gameState: InProgress,
}

var mockRepository Repository
var mockDb db.DBContext
var mockLogger log.Logger

func TestMain(m *testing.M) {
	mockDb = db.GetMockDb()
	mockLogger = log.New()
	mockRepository = &repository{
		db:     mockDb,
		logger: mockLogger,
	}

	err := mockDb.Set(mockRoomId, mockRoom)
	if err != nil {
		return
	}

	code := m.Run()
	os.Exit(code)
}
