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
import { setCookies } from "cookies-next";
import { cookieConstants } from "../constants";

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
    setCookies(cookieConstants.USER_KEY, action.payload["user"]);
    return {
      history: state.history,
      user: action.payload["user"],
      room: {
        id: action.payload["room"]["id"],
        name: action.payload["room"]["name"],
        users: action.payload["room"]["users"],
        admin: action.payload["room"]["admin"],
      },
      vote: {
        votes: action.payload["room"]["votes"],
        selectedVoteCard: state.vote.selectedVoteCard,
      },
    };
  } else if (action.type === "room/getRoom/fulfilled") {
    return {
      history: state.history,
      user: state.user,
      room: {
        id: action.payload["id"],
        name: action.payload["name"],
        users: action.payload["users"],
        admin: action.payload["admin"],
      },
      vote: {
        votes: action.payload["votes"],
        selectedVoteCard: state.vote.selectedVoteCard,
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
