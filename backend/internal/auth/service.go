package auth

import (
	"fmt"

	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
)

type Service interface {
	CreateUser(username string) string
}

type service struct {
	userRepository user.Repository
}

func NewAuthService(userRepository user.Repository) Service {
	return &service{userRepository}
}

func (s *service) CreateUser(username string) string {
	return fmt.Sprintf("Hello", username)
}
