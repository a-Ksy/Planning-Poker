export const localConstants = {
  ROOM_NAME_KEY: "roomName",
  USERNAME_KEY: "username",
};

export const cookieConstants = {
  USER_KEY: "user",
};

export const ROOM_NAME_INPUT_LIMIT = 30;
export const NAME_INPUT_LIMIT = 12;

export const roomActions = {
  ROOM_JOINED: "room-joined",
};

export const gameActions = {
  VOTE_SUBMITTED: "vote-submitted",
};

export const voteCardValues = {
  CONFUSED: -1, // the '?' card
  NOT_SELECTED: -2,
  PRIVATE: -3, // when card is selected but not revealed, the value is private
};
