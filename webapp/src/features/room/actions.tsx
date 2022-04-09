import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async ({ roomName, username }: { roomName: string; username: string }) => {
    const response = await axios.post("http://localhost:8080/api/room/", {
      roomName,
      username,
    });

    return response.data;
  }
);
