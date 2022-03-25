package room

import "github.com/a-Ksy/Planning-Poker/backend/internal/user"

type Room struct {
	Id    string      `json:"id"`
	Name  string      `json:"name"`
	Users []user.User `json:"users"`
	Admin user.User   `json:"admin"`
}
