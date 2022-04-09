import { createAction } from "@reduxjs/toolkit";

export const setName = createAction<string>("user/setName");
export const setId = createAction<string>("user/setId");
export const setToken = createAction<string>("user/setToken");
