import { User } from "../user";
import { voteCardValues } from "../../constants";
export class Room {
  id: string = "";
  name: string = "";
  users: User[] = null;
  admin: User = null;
}
