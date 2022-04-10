import { createReducer } from "@reduxjs/toolkit";
import { setName, setId, setToken } from "./actions";

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
});
