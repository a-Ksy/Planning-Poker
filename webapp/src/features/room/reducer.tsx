import { createReducer } from "@reduxjs/toolkit";
import { User } from "../user";
import { createRoom, getRoom } from "./actions";

type RoomState = {
  id: string;
  name: string;
  users: User[];
  admin: User;
  pending: boolean;
  error: boolean;
};

const initialState: RoomState = {
  id: null,
  name: "my-planning-room",
  users: null,
  admin: null,
  pending: false,
  error: false,
};

export const roomReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createRoom.fulfilled, (state, { payload }) => {
      // The payload is set in the combinedReducer as it contains both user and room information
      state.pending = false;
    })
    .addCase(createRoom.pending, (state) => {
      state.pending = true;
    })
    .addCase(createRoom.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(getRoom.fulfilled, (state, { payload }) => {
      state.id = payload.id;
      state.name = payload.name;
      state.users = payload.users;
      state.admin = payload.admin;
      state.pending = false;
    })
    .addCase(getRoom.pending, (state) => {
      state.pending = true;
    })
    .addCase(getRoom.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
});
