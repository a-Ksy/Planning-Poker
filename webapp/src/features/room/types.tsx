import { User } from "../user";
export class Room {
  id: string = "";
  name: string = "";
  users: User[] = null;
  admin: User = null;
  revealCards: boolean = false;
}
