export class Vote {
  userId: string = "";
  value: Number;

  static fromJSON(json: any): Vote {
    return Object.assign(new Vote(), json);
  }
}

export class Votes {
  votes: {};
  selectedVoteCard: Number;
}
