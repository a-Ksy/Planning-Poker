package user

import (
	"encoding/json"
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

func (u *User) MarshalJSON() ([]byte, error) {
	return json.Marshal(UserDto{
		u.id,
		u.name,
	})
}

func (u *User) UnmarshalJSON(b []byte) error {
	temp := &UserDto{}

	if err := json.Unmarshal(b, &temp); err != nil {
		return err
	}

	u.id = temp.Id
	u.name = temp.Name
	return nil
}
