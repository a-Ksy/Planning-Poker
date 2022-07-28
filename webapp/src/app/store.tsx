import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { roomReducer } from "../features/room";
import { userReducer } from "../features/user";
import { voteReducer } from "../features/vote";
import { historyReducer } from "../features/history";
import { setCookies, getCookie } from "cookies-next";
import { cookieConstants, voteCardValues } from "../constants";

const combinedReducer = combineReducers({
  history: historyReducer,
  user: userReducer,
  room: roomReducer,
  vote: voteReducer,
});

const reducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else if (
    action.type === "room/createRoom/fulfilled" ||
    action.type === "room/joinRoom/fulfilled"
  ) {
    setCookies(cookieConstants.USER_KEY, action.payload["user"], {
      maxAge: 60 * 60 * 6,
    });
    return {
      history: state.history,
      user: action.payload["user"],
      room: {
        id: action.payload["room"]["id"],
        name: action.payload["room"]["name"],
        users: action.payload["room"]["users"],
        admin: action.payload["room"]["admin"],
        gameState: action.payload["room"]["gameState"],
      },
      vote: {
        votes: action.payload["room"]["votes"],
        selectedVoteCard: voteCardValues.NOT_SELECTED,
      },
    };
  } else if (action.type === "room/getRoom/fulfilled") {
    const user = getCookie(cookieConstants.USER_KEY);
    const userAsJson = JSON.parse(user.toString());
    const userId = userAsJson["id"];
    const previousVote = action.payload["votes"][userId];
    return {
      history: state.history,
      user: state.user,
      room: {
        id: action.payload["id"],
        name: action.payload["name"],
        users: action.payload["users"],
        admin: action.payload["admin"],
        gameState: action.payload["gameState"],
      },
      vote: {
        votes: action.payload["votes"],
        selectedVoteCard:
          previousVote !== undefined && previousVote !== null
            ? previousVote
            : voteCardValues.NOT_SELECTED,
      },
    };
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
  });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });
