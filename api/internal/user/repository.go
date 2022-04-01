package user

import (
	db "github.com/a-Ksy/Planning-Poker/backend/pkg/dbcontext"
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
)

type Repository interface{}

type repository struct {
	db     db.DBContext
	logger log.Logger
}

func NewUserRepository(db db.DBContext, logger log.Logger) Repository {
	return &repository{db, logger}
}
