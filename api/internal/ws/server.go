package ws

import (
	"errors"
	"github.com/a-Ksy/Planning-Poker/backend/internal/room"
	"github.com/a-Ksy/Planning-Poker/backend/internal/user"
	"github.com/a-Ksy/Planning-Poker/backend/internal/vote"
)

type WSServer struct {
	roomService room.Service
	games       map[*Game]bool
}

func NewWSServer(roomService room.Service) *WSServer {
	return &WSServer{
		roomService: roomService,
		games:       make(map[*Game]bool),
	}
}

func (s *WSServer) findGameById(id string) *Game {
	var foundGame *Game
	for r := range s.games {
		if r.id == id {
			foundGame = r
			break
		}
	}
	return foundGame
}

func (s *WSServer) createGame(gameId string) *Game {
	game := newGame(gameId)
	go game.runGame()
	s.games[game] = true
	return game
}

func (s *WSServer) findUserById(roomId, userId string) (*user.User, error) {
	room, err := s.roomService.GetRoom(roomId)
	if err != nil {
		return nil, err
	}

	user, err := room.GetUserWithId(userId)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *WSServer) saveVote(roomId string, vote *vote.Vote) error {
	return s.roomService.SetVote(roomId, vote)
}

func (s *WSServer) revealCards(roomId string) (*vote.Votes, error) {
	r, err := s.roomService.GetRoom(roomId)
	if err != nil {
		return nil, err
	}
	if r.GetGameState() == room.CardsRevealed {
		return nil, errors.New("cards are already revealed")
	}

	s.roomService.SetGameState(roomId, room.CardsRevealed)
	return r.GetVotes(), nil
}

func (s *WSServer) resetVotingSession(roomId string) error {
	err := s.roomService.ResetVotingSession(roomId)
	if err != nil {
		return err
	}
	return nil
}
