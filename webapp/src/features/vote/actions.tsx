import { createAction } from "@reduxjs/toolkit";
import { Vote } from "./types";

export const selectVoteCard = createAction<Number>("vote/selectVoteCard");
export const voteSubmitted = createAction<any>("vote/voteSubmitted");
export const setVotes = createAction<any>("vote/setVotes");
