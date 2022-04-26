package vote

import "errors"

type Votes map[string]int

func NewVotes() Votes {
	votes := make(map[string]int)
	return votes
}

func (v Votes) SetVote(userId string, value int) {
	v[userId] = value
}

func (v Votes) GetVote(userId string) (int, error) {
	val, ok := v[userId]
	if !ok {
		return -1, errors.New("couldn't find vote with the given userId")
	}
	return val, nil
}
