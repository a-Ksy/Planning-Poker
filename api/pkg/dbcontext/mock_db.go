package db

import (
	"github.com/alicebob/miniredis/v2"
	"github.com/go-redis/redis/v8"
	"log"
)


func GetMockDb() (DBContext) {
	mr, err := miniredis.Run()
	if err != nil {
		log.Fatalf("an error '%s' was not expected when opening a mock redis connection", err)
	}
	client := redis.NewClient(&redis.Options{
		Addr: mr.Addr(),
	})
	database := SetupDatabaseConnection(client)

	return database
}

func GetMockClientAndDb() (*redis.Client, DBContext) {
	mr, err := miniredis.Run()
	if err != nil {
		log.Fatalf("an error '%s' was not expected when opening a mock redis connection", err)
	}
	client := redis.NewClient(&redis.Options{
		Addr: mr.Addr(),
	})
	database := SetupDatabaseConnection(client)

	return client, database
}
