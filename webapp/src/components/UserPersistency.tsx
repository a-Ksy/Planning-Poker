import { getCookie, checkCookies, removeCookies } from "cookies-next";
import { cookieConstants } from "../constants";
import { User } from "../features/user";
import { CookieValueTypes } from "cookies-next/lib/types";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/user";
import { Box } from "@chakra-ui/react";

function tokenHasExpired(expiresAt: string): boolean {
  const expirationTimestamp: number = Date.parse(expiresAt);
  const currentTimestamp: number = Date.now();

  return currentTimestamp > expirationTimestamp;
}

function UserPersistency(props) {
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

  dispatch(setUser(userAsJson));

  return <Box>{props.children}</Box>;
}

export default UserPersistency;
