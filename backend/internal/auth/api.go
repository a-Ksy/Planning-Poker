package auth

import (
	"net/http"

	"github.com/a-Ksy/Planning-Poker/backend/internal/auth/dto"
	"github.com/gin-gonic/gin"
)

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
	var register dto.Register
	if err := ctx.BindJSON(&register); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, "Invalid request body")
	}

	// dummy := c.service.CreateUser(register.Username)
	// ctx.JSON(200, gin.H{"message": dummy})
}
