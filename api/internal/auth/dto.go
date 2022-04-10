package auth

type Token struct {
	Token     string `json:"token"`
	ExpiresAt string `json:"expiresAt"`
}

type UserWithToken struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	Token     string `json:"token"`
	ExpiresAt string `json:"expiresAt"`
}
