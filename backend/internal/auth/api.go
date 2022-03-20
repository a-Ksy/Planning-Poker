package auth

import "github.com/gin-gonic/gin"

type Controller interface {
	Register(ctx *gin.Context)
}

type controller struct {
	service Service
}

func NewAuthController(service Service) Controller {
	return &controller{service}
}

func (c *controller) Register(ctx *gin.Context) {
	// dummy := c.service.CreateUser()
	// ctx.JSON(200, gin.H{"message": dummy})
}
