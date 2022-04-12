import { createAction } from "@reduxjs/toolkit";

export const setName = createAction<string>("user/setName");
export const setUser = createAction<any>("user/setUser");
