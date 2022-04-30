package config

import "github.com/go-redis/redis/v8"

var dbClient *redis.Client
var pubSubClient *redis.Client

type DBIndex int

const (
	database DBIndex = 0
	pubSub   DBIndex = 1
)

func getRedisClient(i DBIndex) *redis.Client {
	opt, err := redis.ParseURL("REDIS_URL")
	if err != nil {
		panic(err)
	}
	return redis.NewClient(opt)
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
