package vote

type Vote struct {
	UserId string
	Value  int
}

func NewVote(userId string, value int) *Vote {
	return &Vote{userId, value}
}

func IsValidValue(value int) bool {
	_, ok := voteValues[value]
	return ok
}

func IsValueAccountable(value int) bool {
	isAccountable, _ := voteValues[value]
	return isAccountable
}
