import { createReducer } from "@reduxjs/toolkit";
import { setName, setUser } from "./actions";

type UserState = {
  id: string;
  name: string;
  token: string;
  expiresAt: string;
};

const initialState: UserState = {
  id: null,
  name: null,
  token: null,
  expiresAt: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setName, (state, action) => {
    state.name = action.payload;
  });
  builder.addCase(setUser, (state, action) => {
    state.id = action.payload.id;
    state.name = action.payload.name;
    state.token = action.payload.token;
    state.expiresAt = action.payload.expiresAt;
  });
});
