package auth

type Token struct {
	Token     string `json:"token"`
	ExpiresAt string `json:"expiresAt"`
}

type AuthUser struct {
	Id        string `json:"id"`
	RoomId    string `json:"roomId"`
	Name      string `json:"name"`
	Token     string `json:"token"`
	ExpiresAt string `json:"expiresAt"`
}
