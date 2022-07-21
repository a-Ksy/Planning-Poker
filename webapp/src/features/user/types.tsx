export class User {
  id: string = "";
  roomId: string = "";
  name: string = "";
  token: string = "";
  expiresAt: string = "";
  isAFK: boolean = false;

  static fromJSON(userJson: object): User {
    return Object.assign(new User(), userJson);
  }
}
