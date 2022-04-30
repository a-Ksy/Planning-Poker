package config

import "github.com/go-redis/redis/v8"

var dbClient *redis.Client
var pubSubClient *redis.Client

type DBIndex int

const (
	database DBIndex = 0
	pubSub DBIndex = 1
)

func getRedisClient(i DBIndex) *redis.Client {
	client := redis.NewClient(&redis.Options{
			Addr:     "db:6379",
			Password: "",
			DB:       int(i),
		})
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