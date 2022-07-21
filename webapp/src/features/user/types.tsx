export class User {
  id: string = "";
  roomId: string = "";
  name: string = "";
  token: string = "";
  expiresAt: string = "";

  static fromJSON(userJson: object): User {
    return Object.assign(new User(), userJson);
  }
}
