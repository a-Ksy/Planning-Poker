import { createReducer } from "@reduxjs/toolkit";
import { Route } from "./types";
import { setHistory, setId } from "./actions";

type HistoryState = {
  page: Route;
  id: string;
};

const initialState: HistoryState = {
  page: "Landing",
  id: "",
};

export const historyReducer = createReducer(initialState, (builder) => {
  builder.addCase(setHistory, (state, action) => {
    state.page = action.payload;
  }),
    builder.addCase(setId, (state, action) => {
      state.id = action.payload;
    });
});
