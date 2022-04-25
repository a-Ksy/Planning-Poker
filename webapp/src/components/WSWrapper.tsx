import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useState, useEffect } from "react";
import { Room, roomJoined } from "../features/room";
import { Vote, Votes, voteSubmitted } from "../features/vote";
import { User } from "../features/user";
import { roomActions, gameActions } from "../constants";
class Message {
  action: string = "";
  user: User = null;
  message: string = "";

  static fromJSON(json: object): Message {
    return Object.assign(new Message(), json);
  }

  public toString = (): string => {
    return JSON.stringify(this);
  };

  static createMessage(user: User, action: string, message: string): Message {
    const result: Message = new Message();
    result.action = action;
    result.user = user;
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
      const ws = new WebSocket(
        `ws://localhost:8080/api/room/ws/${userState.token}`
      );
      setWs(ws);
    }
  }, [userState.token]);

  // read messages from WebSocket
  if (ws !== null) {
    ws.onmessage = (event: MessageEvent) => {
      const message: Message = Message.fromJSON(JSON.parse(event.data));

      switch (message?.action) {
        case roomActions.ROOM_JOINED:
          dispatch(roomJoined(message.user));
        case gameActions.VOTE_SUBMITTED:
          const vote: Vote = new Vote();
          vote.userId = message.user.id;
          vote.value = parseInt(message.message);
          dispatch(voteSubmitted(JSON.stringify(vote)));
      }
    };
  }

  // send message to WebSocket
  const user: User = new User();
  user.id = userState.id;
  user.name = userState.name;

  // send selected
  useEffect(() => {
    if (ws !== null) {
      console.log(voteState.selectedVoteCard);
      const message: Message = Message.createMessage(
        user,
        gameActions.VOTE_SUBMITTED,
        voteState.selectedVoteCard.toString()
      );
      ws.send(message.toString());
    }
  }, [voteState.selectedVoteCard]);

  return <>{props.children}</>;
};
