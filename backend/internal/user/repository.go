package user

type Repository interface{}

type repository struct{}

func NewUserRepository() Repository {
	return &repository{}
}
