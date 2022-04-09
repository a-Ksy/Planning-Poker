import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setRoomName = createAction<string>("createRoom/setRoomName");
export const setUsername = createAction<string>("createRoom/setUsername");

export const createRoom = createAsyncThunk(
  "createRoom/createRoom",
  async ({ roomName, username }: { roomName: string; username: string }) => {
    const response = await axios.post("http://localhost:8080/api/room/", {
      roomName,
      username,
    });

    return response.data;
  }
);
