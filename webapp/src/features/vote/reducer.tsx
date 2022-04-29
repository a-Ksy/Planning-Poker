import { createReducer } from "@reduxjs/toolkit";
import { voteCardValues } from "../../constants";
import { selectVoteCard, voteSubmitted, setVotes } from "./actions";
import { Vote } from "./types";

type VoteState = {
  votes: {};
  selectedVoteCard: Number;
};

const initialState: VoteState = {
  votes: {},
  selectedVoteCard: voteCardValues.NOT_SELECTED,
};

export const voteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectVoteCard, (state, { payload }) => {
      state.selectedVoteCard = payload;
    })
    .addCase(voteSubmitted, (state, { payload }) => {
      const vote: Vote = JSON.parse(payload);
      state.votes[vote.userId] = vote.value;
    })
    .addCase(setVotes, (state, { payload }) => {
      state.votes = payload;
    });
});
