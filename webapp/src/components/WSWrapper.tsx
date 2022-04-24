import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useState, useEffect } from "react";
import { roomJoined } from "../features/room";
import { User } from "../features/user";
import { roomActions } from "../constants";
class Message {
  action: string = "";
  user: User = null;
  message: string = "";

  static fromJSON(json: object): Message {
    return Object.assign(new Message(), json);
  }
}

export const WSWrapper = (props) => {
  const isBrowser = typeof window !== "undefined";
  const { token }: { token: string } = useAppSelector((state) => state.user);
  const { id }: { id: string } = useAppSelector((state) => state.room);

  const [ws, setWs] = useState(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isBrowser && token !== null) {
      const ws = new WebSocket(`ws://localhost:8080/api/room/ws/${token}`);
      setWs(ws);
    }
  }, [token]);

  if (ws !== null) {
    ws.onmessage = (event: MessageEvent) => {
      const message: Message = Message.fromJSON(JSON.parse(event.data));

      switch (message?.action) {
        case roomActions.ROOM_JOINED:
          dispatch(roomJoined(message.user));
      }
    };
  }

  return <>{props.children}</>;
};
