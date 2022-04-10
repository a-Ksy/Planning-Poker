import { User } from "../user";

export type Room = {
  id: string;
  name: string;
  users: User[];
  admin: User;
};
