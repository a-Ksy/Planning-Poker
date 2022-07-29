package vote

const (
	Confused    = -1 // the '?' card
	NotSelected = -2 // when card is deselected
	Private     = -3 // this value returned when cards are not revealed yet
)

var voteValues = map[int]bool{
	Private:     false, // Private
	NotSelected: false, // Deselect card
	Confused:    false, // Confused : the '?' card
	0:           true,
	1:           true,
	2:           true,
	3:           true,
	4:           true,
	5:           true,
	8:           true,
	13:          true,
	21:          true,
	34:          true,
	55:          true,
	89:          true,
}
