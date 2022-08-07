import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState, useEffect } from "react";
import {
  Room,
  roomJoined,
  revealCards,
  resetVoting,
  setGameState,
  setAFK,
  setOnline,
  removeUser,
} from "../../features/room";
import {
  Vote,
  Votes,
  voteSubmitted,
  setVotes,
  selectVoteCard,
} from "../../features/vote";
import { User } from "../../features/user";
import {
  messages,
  BASE_WS_URL,
  voteCardValues,
  gameStates,
} from "../../constants";

class Message {
  action: string = "";
  clientId: string = null;
  message: string = "";

  static fromJSON(json: object): Message {
    return Object.assign(new Message(), json);
  }

  public toString = (): string => {
    return JSON.stringify(this);
  };

  static createMessage(
    clientId: string,
    action: string,
    message: string
  ): Message {
    const result: Message = new Message();
    result.action = action;
    result.clientId = clientId;
    result.message = message;
    return result;
  }
}

export const WSWrapper = (props) => {
  const isBrowser = typeof window !== "undefined";
  const userState: User = useAppSelector((state) => state.user);
  const roomState: Room = useAppSelector((state) => state.room);
  const voteState: Votes = useAppSelector((state) => state.vote);

  const [ws, setWs] = useState(null);

  const dispatch = useAppDispatch();

  // subscribe to the WebSocket
  useEffect(() => {
    if (isBrowser && userState.token !== null) {
      const ws = new WebSocket(`${BASE_WS_URL}/room/ws/${userState.token}`);
      setWs(ws);
    }
  }, [userState.token]);

  // read messages from WebSocket
  if (ws !== null) {
    ws.onmessage = (event: MessageEvent) => {
      const events = JSON.parse(event.data);

      for (const event of events) {
        const message = Message.fromJSON(event);

        switch (message.action) {
          case messages.ROOM_JOINED:
            dispatch(
              roomJoined({
                userId: message.clientId,
                username: message.message,
              })
            );
            dispatch(setOnline(message.clientId));
            break;
          case messages.VOTE_SUBMITTED:
            let vote: Vote = new Vote();
            vote.userId = message.clientId;
            vote.value = parseInt(message.message);
            dispatch(voteSubmitted(JSON.stringify(vote)));
            break;
          case messages.CARDS_REVEALED:
            const votes = JSON.parse(message.message);
            dispatch(setGameState(gameStates.CARDS_REVEALED));
            dispatch(revealCards(true));
            dispatch(setVotes(votes));
            break;
          case messages.NEW_VOTING_STARTED:
            dispatch(setGameState(gameStates.IN_PROGRESS));
            dispatch(revealCards(false));
            dispatch(resetVoting(false));
            dispatch(setVotes(new Object()));
            dispatch(selectVoteCard(voteCardValues.EMPTY));
            break;
          case messages.IS_AFK:
            dispatch(setAFK(message.clientId));
            break;
          case messages.DISCONNECTED:
            dispatch(removeUser(message.clientId));
            vote = new Vote();
            vote.userId = message.clientId;
            vote.value = voteCardValues.NOT_SELECTED;
            dispatch(voteSubmitted(JSON.stringify(vote)));
            break;
        }
      }
    };
  }

  // send message to WebSocket
  const user: User = new User();
  user.id = userState.id;
  user.name = userState.name;

  // send selected vote card
  useEffect(() => {
    if (voteState.selectedVoteCard === voteCardValues.EMPTY) {
      return;
    }

    if (ws !== null) {
      const message: Message = Message.createMessage(
        user.id,
        messages.VOTE_SUBMITTED,
        voteState.selectedVoteCard.toString()
      );
      ws.send(message.toString());
    }
  }, [voteState.selectedVoteCard]);

  // send reveal card request
  useEffect(() => {
    if (
      !roomState.revealCards ||
      roomState.gameState !== gameStates.IN_PROGRESS
    ) {
      return;
    }
    if (ws !== null) {
      const message: Message = Message.createMessage(
        user.id,
        messages.REVEAL_CARDS,
        ""
      );
      ws.send(message.toString());
    }
  }, [roomState.revealCards]);

  // send reset voting request
  useEffect(() => {
    if (
      !roomState.resetVoting ||
      roomState.gameState !== gameStates.CARDS_REVEALED
    ) {
      return;
    }
    if (ws !== null) {
      const message: Message = Message.createMessage(
        user.id,
        messages.START_NEW_VOTING,
        ""
      );
      ws.send(message.toString());
    }
  }, [roomState.resetVoting]);

  return <>{props.children}</>;
};
