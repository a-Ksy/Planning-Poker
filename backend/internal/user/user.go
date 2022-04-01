package user

import "fmt"

type User struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func (u *User) String() string {
	return fmt.Sprintln("Id:", u.Id, "Name:", u.Name)
}
