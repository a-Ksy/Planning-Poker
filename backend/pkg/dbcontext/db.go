package db

import (
	"context"
	"encoding/json"

	"github.com/go-redis/redis/v8"
)

type DBContext interface {
	Set(key string, value interface{}) error
	Get(key string, dest interface{}) error
}

type dbcontext struct {
	rdb *redis.Client
}

func SetupDatabaseConnection() DBContext {
	// TODO: Get addr and password from .env
	rdb := redis.NewClient(&redis.Options{
		Addr:     "db:6379",
		Password: "",
		DB:       0,
	})

	return &dbcontext{rdb: rdb}
}

func (c *dbcontext) Set(key string, value interface{}) error {
	p, err := json.Marshal(value)
	if err != nil {
		return err
	}
	return c.rdb.Set(context.Background(), key, p, 0).Err()
}

func (c *dbcontext) Get(key string, dest interface{}) error {
	p, err := c.rdb.Get(context.Background(), key).Bytes()
	if err != nil {
		return err
	}
	return json.Unmarshal(p, dest)
}
