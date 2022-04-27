package vote

import (
	"errors"
)

type Votes map[string]int

func NewVotes() Votes {
	votes := make(map[string]int)
	return votes
}

func (v Votes) SetVote(vote *Vote) {
	v[vote.UserId] = vote.Value
}

func (v Votes) GetVote(userId string) (int, error) {
	val, ok := v[userId]
	if !ok {
		return -1, errors.New("couldn't find vote with the given userId")
	}
	return val, nil
}

func (v Votes) HideVotesExceptUserId(userId string) {
	for id, val := range v {
		if userId == id {
			continue
		}
		if IsValueAccountable(val) {
			v[id] = Private
		}
	}
}
