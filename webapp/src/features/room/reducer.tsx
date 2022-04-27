import { createReducer } from "@reduxjs/toolkit";
import { User } from "../user";
import { createRoom, getRoom, joinRoom, roomJoined } from "./actions";

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
      // The payload is set in the combinedReducer as it contains both user and room information
      state.pending = false;
    })
    .addCase(getRoom.pending, (state) => {
      state.pending = true;
    })
    .addCase(getRoom.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(joinRoom.fulfilled, (state, { payload }) => {
      // The payload is set in the combinedReducer as it contains both user and room information
      state.pending = false;
    })
    .addCase(joinRoom.pending, (state) => {
      state.pending = true;
    })
    .addCase(joinRoom.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(roomJoined, (state, { payload }) => {
      const prevUsers: User[] = state.users;
      for (const user of prevUsers) {
        if (user.id == payload.id) {
          return;
        }
      }
      prevUsers.push(payload);
      state.users = prevUsers;
    });
});
