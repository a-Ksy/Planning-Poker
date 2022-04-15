import { createAction } from "@reduxjs/toolkit";
import { Route } from "./types";

export const setHistory = createAction<Route>("history/setHistory");
export const setId = createAction<string>("history/setId");
