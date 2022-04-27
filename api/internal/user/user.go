package user

import (
	"fmt"
	"github.com/google/uuid"
)

type User struct {
	id   string `json:"id"`
	name string `json:"name"`
}

func NewUser(name string) *User {
	return &User{id: uuid.New().String(), name: name}
}

func (u *User) GetId() string {
	return u.id
}

func (u *User) GetName() string {
	return u.name
}

func (u *User) String() string {
	return fmt.Sprintln("Id:", u.id, "Name:", u.name)
}
