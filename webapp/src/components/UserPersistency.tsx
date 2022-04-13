import { getCookie, checkCookies, removeCookies } from "cookies-next";
import { cookieConstants } from "../constants";
import { User } from "../features/user";
import { CookieValueTypes } from "cookies-next/lib/types";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/user";
import { getRoom } from "../features/room";
import { useEffect } from "react";

function tokenHasExpired(expiresAt: string): boolean {
  const expirationTimestamp: number = Date.parse(expiresAt);
  const currentTimestamp: number = Date.now();

  return currentTimestamp > expirationTimestamp;
}

function UserPersistency() {
  if (!checkCookies(cookieConstants.USER_KEY)) {
    return null;
  }

  const userString: CookieValueTypes = getCookie(cookieConstants.USER_KEY);
  const userAsJson = JSON.parse(userString.toString());

  let user: User = User.fromJSON(userAsJson);

  if (user === undefined || user === null || tokenHasExpired(user.expiresAt)) {
    removeCookies(cookieConstants.USER_KEY);
    return null;
  }

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUser(userAsJson));
    dispatch(getRoom({ roomId: user.roomId, token: user.token }));
  }, []);

  return null;
}

export default UserPersistency;
