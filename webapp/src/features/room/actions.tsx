import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async ({ roomName, username }: { roomName: string; username: string }) => {
    const response = await axios.post("http://localhost:8080/api/room/", {
      roomName,
      username,
    });

    return response.data;
  }
);

export const getRoom = createAsyncThunk(
  "room/getRoom",
  async ({ roomId, token }: { roomId: string; token: string }) => {
    const response = await axios.get(
      `http://localhost:8080/api/room/${roomId}`,
      { headers: { Authorization: token } }
    );

    return response.data;
  }
);

export const joinRoom = createAsyncThunk(
  "room/joinRoom",
  async ({ roomId, username }: { roomId: string; username: string }) => {
    const response = await axios.post(
      `http://localhost:8080/api/room/${roomId}`,
      { roomId, username }
    );

    return response.data;
  }
);
