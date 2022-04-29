export const BASE_URL = "http://localhost:8080/api";
export const BASE_WS_URL = "ws://localhost:8080/api";

export const localConstants = {
  ROOM_NAME_KEY: "roomName",
  USERNAME_KEY: "username",
};

export const cookieConstants = {
  USER_KEY: "user",
};

export const ROOM_NAME_INPUT_LIMIT = 30;
export const NAME_INPUT_LIMIT = 12;

export const messages = {
  ROOM_JOINED: "room-joined",
  VOTE_SUBMITTED: "vote-submitted",
  REVEAL_CARDS: "reveal-cards",
  CARDS_REVEALED: "cards-revealed",
  START_NEW_VOTING: "start-new-voting",
  NEW_VOTING_STARTED: "new-voting-started",
};

export const gameStates = {
  IN_PROGRESS: "IN_PROGRESS",
  CARDS_REVEALED: "CARDS_REVEALED",
};

export const voteCardValues = {
  CONFUSED: -1, // the '?' card
  NOT_SELECTED: -2,
  PRIVATE: -3, // when card is selected but not revealed, the value is private
  EMPTY: -4, // used on the client side only, when restarting the voting session
};
