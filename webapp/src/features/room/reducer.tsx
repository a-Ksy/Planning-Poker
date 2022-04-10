import { createReducer } from "@reduxjs/toolkit";
import { User } from "../user";
import { createRoom } from "./actions";

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
    });
});
