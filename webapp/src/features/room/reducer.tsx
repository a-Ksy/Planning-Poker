import { createReducer } from "@reduxjs/toolkit";
import { createRoom } from "./actions";
import { Room } from "./types";

type RoomState = {
  room: Room;
  pending: boolean;
  error: boolean;
};

const initialState: RoomState = {
  room: { name: "my-planning-room", id: null },
  pending: false,
  error: false,
};

export const roomReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createRoom.fulfilled, (state, { payload }) => {
      state.room = payload;
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
