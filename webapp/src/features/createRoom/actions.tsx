import { createAction } from "@reduxjs/toolkit";

export const setRoomName = createAction<string>("createRoom/setRoomName");
export const setUsername = createAction<string>("createRoom/setUsername");
export const createRoom = createAction("createRoom/createRoom");
