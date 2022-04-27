package room

import "encoding/json"

func (r *Room) MarshalJSON() ([]byte, error) {
	return json.Marshal(RoomDto{
		r.id,
		r.name,
		r.users,
		r.admin,
		r.votes,
		r.gameState,
	})
}

func (r *Room) UnmarshalJSON(b []byte) error {
	temp := &RoomDto{}

	if err := json.Unmarshal(b, &temp); err != nil {
		return err
	}

	r.id = temp.Id
	r.name = temp.Name
	r.users = temp.Users
	r.admin = temp.Admin
	r.votes = temp.Votes
	r.gameState = temp.GameState
	return nil
}
