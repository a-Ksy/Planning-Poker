import { gameStates } from "../../constants";
import { User } from "../user";
export class Room {
  id: string = "";
  name: string = "";
  users: User[] = null;
  admin: User = null;
  revealCards: boolean = false;
  resetVoting: boolean = false;
  gameState: string = gameStates.IN_PROGRESS;
  kickedUserId: string = null;
}
