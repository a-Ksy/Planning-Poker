package vote

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestNewVote(t *testing.T) {
	expected := &Vote{
		UserId: dummyId1,
		Value:  55,
	}
	result := NewVote(dummyId1, 55)
	assert.Equal(t, expected, result)
}

func TestIsValidValue(t *testing.T) {
	assert.Equal(t, false, IsValidValue(123456))
	assert.Equal(t, true, IsValidValue(55))
}

func TestIsValueAccountable(t *testing.T) {
	assert.Equal(t, false, IsValueAccountable(Confused))
	assert.Equal(t, false, IsValueAccountable(NotSelected))
	assert.Equal(t, false, IsValueAccountable(Private))
	assert.Equal(t, true, IsValueAccountable(1))
	assert.Equal(t, false, IsValueAccountable(12345))
}
