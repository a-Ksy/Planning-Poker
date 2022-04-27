package user

import "encoding/json"

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
