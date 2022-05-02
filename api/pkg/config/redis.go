package config

import (
	"os"

	"github.com/go-redis/redis/v8"
)

var dbClient *redis.Client
var pubSubClient *redis.Client

type DBIndex int

const (
	database DBIndex = 0
	pubSub   DBIndex = 1
)

func getRedisClient(i DBIndex) *redis.Client {

	var client *redis.Client

	appEnv := os.Getenv("APP_ENV")

	if appEnv == "dev" {
		client = redis.NewClient(&redis.Options{
			Addr:     "db:6379",
			Password: "",
			DB:       int(i),
		})
	} else {
		opt, err := redis.ParseURL(os.Getenv("REDIS_URL"))
		if err != nil {
			panic(err)
		}
		opt.DB = int(i)
		client = redis.NewClient(opt)
	}
	return client
}

func GetDbClient() *redis.Client {
	if dbClient == nil {
		dbClient = getRedisClient(database)
	}
	return dbClient
}

func GetPubSubClient() *redis.Client {
	if pubSubClient == nil {
		pubSubClient = getRedisClient(pubSub)
	}
	return pubSubClient
}
