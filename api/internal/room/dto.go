package room

type RoomCreation struct {
	RoomName string `json:"roomName" validate:"required"`
	Username string `json:"username" validate:"required"`
}
