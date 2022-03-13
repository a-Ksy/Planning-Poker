package auth

import (
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
)

type Service interface {
	CreateUser() string
}

type service struct {
	userRepository user.Repository
}

func NewAuthService(userRepository user.Repository) Service {
	return &service{userRepository}
}

func (s *service) CreateUser() string {
	return "hello world"
}
