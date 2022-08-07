import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../user";
import { BASE_URL } from "../../constants";

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async ({ roomName, username }: { roomName: string; username: string }) => {
    const response = await axios.post(`${BASE_URL}/room/`, {
      roomName,
      username,
    });

    return response.data;
  }
);

export const getRoom = createAsyncThunk(
  "room/getRoom",
  async ({ roomId, token }: { roomId: string; token: string }) => {
    const response = await axios.get(`${BASE_URL}/room/${roomId}`, {
      headers: { Authorization: token },
    });

    return response.data;
  }
);

export const joinRoom = createAsyncThunk(
  "room/joinRoom",
  async ({ roomId, username }: { roomId: string; username: string }) => {
    const response = await axios.post(`${BASE_URL}/room/${roomId}`, {
      roomId,
      username,
    });

    return response.data;
  }
);

export const roomJoined = createAction<{ userId: string; username: string }>(
  "room/roomJoined"
);

export const revealCards = createAction<boolean>("room/revealCards");

export const resetVoting = createAction<boolean>("room/resetVoting");

export const setGameState = createAction<string>("room/setGameState");

export const setAFK = createAction<string>("room/setAFK");

export const setOnline = createAction<string>("room/setOnline");

export const removeUser = createAction<string>("room/removeUser");

export const setKickedUserId = createAction<string>("room/setKickedUserId");
