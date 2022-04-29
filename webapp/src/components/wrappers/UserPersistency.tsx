import { getCookie, checkCookies, removeCookies } from "cookies-next";
import { cookieConstants } from "../../constants";
import { User } from "../../features/user";
import { CookieValueTypes } from "cookies-next/lib/types";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/user";
import { getRoom } from "../../features/room";
import { setId } from "../../features/history";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setHistory } from "../../features/history";

function tokenHasExpired(expiresAt: string): boolean {
  const expirationTimestamp: number = Date.parse(expiresAt);
  const currentTimestamp: number = Date.now();

  return currentTimestamp > expirationTimestamp;
}

function UserPersistency() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query, isReady } = router;

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!checkCookies(cookieConstants.USER_KEY)) {
      dispatch(setHistory("Game"));
      const { id } = query;
      dispatch(setId(id.toString()));
      router.push(`/newplayer`);
      return;
    }

    const userString: CookieValueTypes = getCookie(cookieConstants.USER_KEY);
    const userAsJson = JSON.parse(userString.toString());

    let user: User = User.fromJSON(userAsJson);

    if (
      user === undefined ||
      user === null ||
      tokenHasExpired(user.expiresAt) ||
      user.roomId !== query.id
    ) {
      removeCookies(cookieConstants.USER_KEY);
      if (user.roomId !== query.id) {
        dispatch(setHistory("Game"));
        dispatch(setId(query.id.toString()));
      }
      router.push(`/newplayer`);
      return;
    }

    dispatch(setUser(userAsJson));
    dispatch(getRoom({ roomId: user.roomId, token: user.token }));
  }, [isReady]);

  return null;
}

export default UserPersistency;
