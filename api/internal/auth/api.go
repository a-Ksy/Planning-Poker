package auth

import (
	"github.com/a-Ksy/Planning-Poker/backend/pkg/log"
	"github.com/gin-gonic/gin"
)

type Controller interface {
	Register(ctx *gin.Context)
}

type controller struct {
	service Service
	logger  log.Logger
}

func NewAuthController(service Service, logger log.Logger) Controller {
	return &controller{service, logger}
}

func (c *controller) Register(ctx *gin.Context) {

	// dummy := c.service.CreateUser(register.Username)
	ctx.JSON(200, gin.H{"message": "dummy"})
}
