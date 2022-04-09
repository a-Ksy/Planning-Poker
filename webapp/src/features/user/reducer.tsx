import { createReducer } from "@reduxjs/toolkit";
import { setName, setId, setToken } from "./actions";
import { User } from "./types";

type UserState = {
  user: User;
};

const initialState: UserState = {
  user: null,
};

export const UserReducer = createReducer(initialState, (builder) => {
  builder.addCase(setName, (state, action) => {
    state.user.name = action.payload;
  });
  builder.addCase(setId, (state, action) => {
    state.user.id = action.payload;
  });
  builder.addCase(setToken, (state, action) => {
    state.user.token = action.payload;
  });
});
