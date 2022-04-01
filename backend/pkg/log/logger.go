package log

import (
	"go.uber.org/zap"
)

type Logger interface {
	Info(args ...interface{})
	Error(args ...interface{})
}

type logger struct {
	*zap.SugaredLogger
}

func New() Logger {
	l, _ := zap.NewProduction()
	return &logger{l.Sugar()}
}
