import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useState, useEffect } from "react";
import { getRoom } from "../features/room";

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
    ws.onmessage = () => {
      // TODO: Parse the messages into JSON and update the Redux store based on the message.
      dispatch(getRoom({ roomId: id, token }));
    };
  }

  return <>{props.children}</>;
};
