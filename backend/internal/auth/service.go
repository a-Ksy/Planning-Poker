package auth

import (
	"fmt"

	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
)

type Service interface {
	CreateUser(username string) string
}

type service struct {
	userRepository user.Repository
	logger         log.Logger
}

func NewAuthService(userRepository user.Repository, logger log.Logger) Service {
	return &service{userRepository, logger}
}

func (s *service) CreateUser(username string) string {
	return fmt.Sprintf("Hello", username)
}
