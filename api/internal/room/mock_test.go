package room

import (
	"fmt"
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/a-Ksy/Planning-Poker/backend/internal/vote"
	db "github.com/a-Ksy/Planning-Poker/backend/pkg/dbcontext"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
	"os"
	"testing"
)

const (
	mockRoomId          = "1"
	mockRoomId2 		= "2"
	mockRoomName        = "sprint-planning"
	mockInvalidRoomName = "5mQ9zPhHNVWNJIJGrdw0qkXlIartvTT"
	mockUsername1       = "Michael"
	mockInvalidUsername = "2MiKJmAjFTgq2"
	mockUsername2       = "Dwight"
	dummyIdDoesNotExist = "DOES_NOT_EXIST"
	mockVoteValue1      = 55
	mockVoteValue2      = 13
)

var mockUser1 *user.User
var mockUser2 *user.User

var mockRoom *Room
var mockFullRoom *Room

var mockController Controller
var mockService Service
var mockRepository Repository
var mockDb db.DBContext
var mockLogger log.Logger

func TestMain(m *testing.M) {
	setupUnitTest()
	code := m.Run()
	os.Exit(code)
}

func setupUnitTest() {
	mockUser1 = user.NewUser(mockUsername1)
	mockUser2 = user.NewUser(mockUsername2)

	mockRoom = &Room{
		id:        mockRoomId,
		name:      mockRoomName,
		users:     []user.User{*mockUser1, *mockUser2},
		admin:     mockUser1,
		votes:     vote.NewVotes(),
		gameState: InProgress,
	}

	mockFullRoom = &Room{
		id:        mockRoomId2,
		name:      mockRoomName,
		users:     []user.User{*mockUser1},
		admin:     mockUser1,
		votes:     vote.NewVotes(),
		gameState: InProgress,
	}

	mockDb = db.GetMockDb()
	mockLogger = log.New()
	mockRepository = &repository{
		db:     mockDb,
		logger: mockLogger,
	}

	mockService = &service{
		roomRepository: mockRepository,
		logger:         mockLogger,
	}

	mockRoom.GetVotes().SetVote(vote.NewVote(mockUser1.GetId(), mockVoteValue1))
	mockRoom.GetVotes().SetVote(vote.NewVote(mockUser2.GetId(), mockVoteValue2))

	for i := 0; i < maxUsers - 1; i++ {
		mockFullRoom.AddUser(user.NewUser(fmt.Sprint(i)))
	}

	err := mockDb.Set(mockRoomId, mockRoom)
	if err != nil {
		return
	}

	err = mockDb.Set(mockRoomId2, mockFullRoom)
	if err != nil {
		return
	}

	mockController = &controller{
		service: mockService,
		logger:  mockLogger,
	}
}