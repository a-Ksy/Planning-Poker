package db

import (
	"context"
	"encoding/json"
	"github.com/go-redis/redis/v8"
	"github.com/stretchr/testify/assert"
	"log"
	"os"
	"testing"
)

var database DBContext
var client *redis.Client

type dummy struct {
	SomeValue string `json:"someValue"`
}

var (
	key = "key"
	val = dummy{SomeValue: "val"}
)

func TestMain(m *testing.M) {
	client, database = GetMockClientAndDb()
	code := m.Run()
	os.Exit(code)
}

func TestSet(t *testing.T) {
	err := database.Set(key, val)
	assert.NoError(t, err)

	v, err := client.Get(context.TODO(), key).Result()
	assert.NoError(t, err)

	var res dummy
	err = json.Unmarshal([]byte(v), &res)
	if err != nil {
		log.Fatalf("an error '%s' was not expected when umarshalling dummy struct", err)
	}

	assert.Equal(t, val, res)
}

func TestGet(t *testing.T) {
	p, err := json.Marshal(val)
	if err != nil {
		log.Fatalf("an error '%s' was not expected when marshalling dummy struct", err)
	}

	err = client.Set(context.TODO(), key, p, 0).Err()
	if err != nil {
		log.Fatalf("an error '%s' was not expected when setting a key value pair to mock redis server", err)
	}

	var res dummy
	err = database.Get(key, &res)
	assert.NoError(t, err)
	assert.Equal(t, val, res)
}