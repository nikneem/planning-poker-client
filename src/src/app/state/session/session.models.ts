export class SessionCreateDto {
  name?: string;

  constructor(init?: Partial<SessionCreateDto>) {
    Object.assign(this, init);
  }
}

export class SessionJoinDto {
  code?: string;
  name?: string;

  constructor(init?: Partial<SessionJoinDto>) {
    Object.assign(this, init);
  }
}

export class SessionDetailsDto {
  code?: string;
  connectionUrl?: string;
  userId?: string;
  username?: string;

  constructor(init?: Partial<SessionCreateDto>) {
    Object.assign(this, init);
  }
}

export class SessionJoinGroupDto {
  userId?: string;
  name?: string;

  constructor(init?: Partial<SessionJoinGroupDto>) {
    Object.assign(this, init);
  }
}
export class SessionParticipantDto {
  userId: string;
  name: string;
  currentVote?: number;

  constructor(id: string, name: string) {
    this.userId = id;
    this.name = name;
  }
}
export class SessionParticipantVoteDto {
  userId: string;
  vote: number;

  constructor(id: string, vote: number) {
    this.userId = id;
    this.vote = vote;
  }
}
