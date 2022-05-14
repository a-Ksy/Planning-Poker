package room

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestNewRoomController(t *testing.T) {
	setupUnitTest()
	expected := &controller{
		service: mockService,
		logger:  mockLogger,
	}

	actual := NewRoomController(mockService, mockLogger)
	assert.Equal(t, expected, actual)
}

func TestController_CreateRoom(t *testing.T) {
	setupUnitTest()
	gin.SetMode(gin.TestMode)

	r := gin.Default()
	r.POST("/api/room/", mockController.CreateRoom)

	// Testing empty body
	req := createRequest(http.MethodPost, "/api/room/", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusBadRequest, w.Code)

	// Testing missing field
	roomCreation := &RoomCreation{
		RoomName: mockRoomName,
	}
	req = createRequest(http.MethodPost, "/api/room/", roomCreation)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusBadRequest, w.Code)

	// Testing long roomName
	roomCreation = &RoomCreation{
		RoomName: mockInvalidRoomName,
		Username: mockUsername1,
	}
	req = createRequest(http.MethodPost, "/api/room/", roomCreation)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusBadRequest, w.Code)

	// Testing long username
	roomCreation = &RoomCreation{
		RoomName: mockRoomName,
		Username: mockInvalidUsername,
	}
	req = createRequest(http.MethodPost, "/api/room/", roomCreation)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusBadRequest, w.Code)

	// Happy path
	roomCreation = &RoomCreation{
		RoomName: mockRoomName,
		Username: mockUsername1,
	}
	req = createRequest(http.MethodPost, "/api/room/", roomCreation)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusCreated, w.Code)
}

func TestController_GetRoom(t *testing.T) {
	setupUnitTest()

	gin.SetMode(gin.TestMode)

	r := gin.Default()
	r.GET("/api/room/:id", mockController.GetRoom)

	// Testing non-existing room
	req := createRequest(http.MethodGet, fmt.Sprintf("%s/%s", "/api/room", dummyIdDoesNotExist), nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusNotFound, w.Code)

	// Happy path
	req = createRequest(http.MethodGet, fmt.Sprintf("%s/%s", "/api/room", mockRoom.GetId()), nil)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestController_JoinRoom(t *testing.T) {
	setupUnitTest()

	gin.SetMode(gin.TestMode)

	r := gin.Default()
	r.POST("/api/room/:id", mockController.JoinRoom)

	// Testing empty body
	req := createRequest(http.MethodPost, fmt.Sprintf("%s/%s", "/api/room", mockRoom.GetId()), nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusBadRequest, w.Code)

	// Testing invalid username
	joinRoom := &JoinRoom{
		RoomId:   mockRoom.GetId(),
		Username: mockInvalidUsername,
	}
	req = createRequest(http.MethodPost, fmt.Sprintf("%s/%s", "/api/room", mockRoom.GetId()), joinRoom)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusBadRequest, w.Code)

	// Testing non-existing room
	joinRoom = &JoinRoom{
		RoomId:   dummyIdDoesNotExist,
		Username: mockUsername1,
	}
	req = createRequest(http.MethodPost, fmt.Sprintf("%s/%s", "/api/room", mockRoom.GetId()), joinRoom)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusConflict, w.Code)

	// Testing full room
	joinRoom = &JoinRoom{
		RoomId:   mockFullRoom.GetId(),
		Username: mockUsername1,
	}
	req = createRequest(http.MethodPost, fmt.Sprintf("%s/%s", "/api/room", mockFullRoom.GetId()), joinRoom)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusConflict, w.Code)

	// Happy path
	joinRoom = &JoinRoom{
		RoomId:   mockRoom.GetId(),
		Username: mockUsername1,
	}
	req = createRequest(http.MethodPost, fmt.Sprintf("%s/%s", "/api/room", mockRoom.GetId()), joinRoom)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)
}

func createRequest(method, url string, body interface{}) *http.Request {
	payloadBuf := new(bytes.Buffer)
	json.NewEncoder(payloadBuf).Encode(body)

	req, err := http.NewRequest(method, url, payloadBuf)
	if err != nil {
		log.Fatalf("Couldn't create request: %v\n", err)
	}
	return req
}