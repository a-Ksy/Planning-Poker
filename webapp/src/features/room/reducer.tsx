import { createReducer } from "@reduxjs/toolkit";
import { User } from "../user";
import {
  createRoom,
  getRoom,
  joinRoom,
  revealCards,
  roomJoined,
  resetVoting,
  setGameState,
  setAFK,
  setOnline,
  removeUser,
} from "./actions";
import { gameStates, cookieConstants } from "../../constants";
import { removeCookies } from "cookies-next";

type RoomState = {
  id: string;
  name: string;
  users: User[];
  admin: User;
  gameState: string;
  revealCards: boolean;
  resetVoting: boolean;
  pending: boolean;
  error: boolean;
};

const initialState: RoomState = {
  id: null,
  name: "my-planning-room",
  users: null,
  admin: null,
  gameState: gameStates.IN_PROGRESS,
  revealCards: false,
  resetVoting: false,
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
      removeCookies(cookieConstants.USER_KEY);
      document.location.reload();
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
      var prevUsers: User[] = state.users;
      for (const user of prevUsers) {
        if (user.id == payload.userId) {
          return;
        }
      }

      const userJson = {
        id: payload.userId,
        name: payload.username,
        isAFK: false,
      };

      const newUser = User.fromJSON(userJson);

      prevUsers.push(newUser);
      state.users = JSON.parse(JSON.stringify(prevUsers));
    })
    .addCase(revealCards, (state, { payload }) => {
      state.revealCards = payload;
    })
    .addCase(resetVoting, (state, { payload }) => {
      state.resetVoting = payload;
    })
    .addCase(setGameState, (state, { payload }) => {
      state.gameState = payload;
    })
    .addCase(setAFK, (state, { payload }) => {
      var users: User[] = state.users;
      for (let user of users) {
        if (user.id == payload) {
          user.isAFK = true;
          break;
        }
      }
      state.users = JSON.parse(JSON.stringify(users));
    })
    .addCase(setOnline, (state, { payload }) => {
      var users: User[] = state.users;
      for (let user of users) {
        if (user.id == payload) {
          user.isAFK = false;
          break;
        }
      }
      state.users = JSON.parse(JSON.stringify(users));
    })
    .addCase(removeUser, (state, { payload }) => {
      var filteredUsers: User[] = state.users.filter(
        (user) => user.id != payload
      );
      state.users = JSON.parse(JSON.stringify(filteredUsers));
    });
});
