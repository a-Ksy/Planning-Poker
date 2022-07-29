package vote

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

const (
	dummyId1            = "1"
	dummyId2            = "2"
	dummyId3            = "3"
	dummyId4            = "4"
	dummyIdDoesNotExist = "DOES_NOT_EXIST"
)

var dummyVote = Vote{
	UserId: dummyId4,
	Value:  55,
}

func TestNewVotes(t *testing.T) {
	expected := Votes{}
	result := NewVotes()
	assert.Equal(t, expected, result)
}

func TestSetVote(t *testing.T) {
	var votes Votes = map[string]int{dummyId1: 13, dummyId2: 1, dummyId3: 2}

	expected := Votes{dummyId1: 13, dummyId2: 1, dummyId3: 2, dummyId4: 55}
	votes.SetVote(&dummyVote)
	assert.Equal(t, votes, expected)
}

func TestGetVote(t *testing.T) {
	var votes Votes = map[string]int{dummyId1: 13, dummyId2: 1, dummyId3: 2}

	_, err := votes.GetVote(dummyIdDoesNotExist)
	assert.Error(t, err)

	val, err := votes.GetVote(dummyId1)
	assert.NoError(t, err)
	assert.Equal(t, 13, val)
}

func TestRemoveVote(t *testing.T) {
	var votes Votes = map[string]int{dummyId1: 13, dummyId2: 1, dummyId3: 2}
	votes.RemoveVote(dummyId1)
	var expectedVotes Votes = map[string]int{dummyId2: 1, dummyId3: 2}
	assert.Equal(t, expectedVotes, votes)
}

func TestHideVotesExceptUserId(t *testing.T) {
	var votes Votes = map[string]int{dummyId1: 13, dummyId2: 1, dummyId3: 2}

	userId := dummyId3
	expected := Votes{dummyId1: Private, dummyId2: Private, dummyId3: 2}
	votes.HideVotesExceptUserId(userId)
	assert.Equal(t, expected, votes)
}
