package vote

type Vote struct {
	UserId string
	Value int
}

func NewVote(userId string, value int) *Vote {
	return &Vote{userId, value}
}
