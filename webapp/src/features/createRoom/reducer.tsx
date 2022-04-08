import { createReducer } from "@reduxjs/toolkit";
import { setRoomName, setUsername, createRoom } from "./actions";

type CreateRoomState = {
  roomName: string;
  username: string;
};

const initialState: CreateRoomState = {
  roomName: "my-planning-poker-room",
  username: "admin",
};

export const createRoomReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setRoomName, (state, action) => {
      state.roomName = action.payload;
    })
    .addCase(setUsername, (state, action) => {
      state.username = action.payload;
    })
    .addCase(createRoom, (state, action) => {
      state.username = action.payload;
    });
});
