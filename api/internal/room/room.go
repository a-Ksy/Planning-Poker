package room

import (
	"fmt"

	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
)

type Room struct {
	Id    string      `json:"id"`
	Name  string      `json:"name"`
	Users []user.User `json:"users"`
	Admin user.User   `json:"admin"`
}

func (r Room) String() string {
	return fmt.Sprintln("Id:", r.Id, "Name:", r.Name, "Users:", r.Users, "Admin:", r.Admin)
}
