package user

import db "github.com/a-Ksy/Planning-Poker/backend/pkg/dbcontext"

type Repository interface{}

type repository struct {
	db db.DBContext
}

func NewUserRepository(db db.DBContext) Repository {
	return &repository{db}
}
