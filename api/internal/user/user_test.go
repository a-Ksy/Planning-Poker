package user

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

const (
	dummyId   = "123"
	dummyName = "Atahan"
)

func TestNewUser(t *testing.T) {
	result := NewUser(dummyName)
	expected := &User{
		id:   result.id,
		name: dummyName,
	}
	assert.Equal(t, expected, result)
}

func TestGetId(t *testing.T) {
	user := &User{id: dummyId, name: dummyName}
	assert.Equal(t, user.id, user.GetId())
}

func TestGetName(t *testing.T) {
	user := &User{id: dummyId, name: dummyName}
	assert.Equal(t, user.name, user.GetName())
}

func TestString(t *testing.T) {
	expected := "Id: 123 Name: Atahan\n"
	user := &User{id: dummyId, name: dummyName}
	assert.Equal(t, user.String(), expected)
}
