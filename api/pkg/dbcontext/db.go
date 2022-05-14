package db

import (
	"context"
	"encoding/json"
	"time"

	"github.com/go-redis/redis/v8"
)

const (
	expirationDuration = 45 * time.Minute
)

type DBContext interface {
	Set(key string, value interface{}) error
	Get(key string, dest interface{}) error
	Close() error
}

type dbcontext struct {
	rdb *redis.Client
}

func SetupDatabaseConnection(rdb *redis.Client) DBContext {
	return &dbcontext{rdb: rdb}
}

func (c *dbcontext) Set(key string, value interface{}) error {
	p, err := json.Marshal(value)
	if err != nil {
		return err
	}
	return c.rdb.Set(context.Background(), key, p, expirationDuration).Err()
}

func (c *dbcontext) Get(key string, dest interface{}) error {
	v, err := c.rdb.Get(context.Background(), key).Result()
	if err != nil {
		return err
	}

	return json.Unmarshal([]byte(v), dest)
}

func (c *dbcontext) Close() error {
	return c.rdb.Close()
}
