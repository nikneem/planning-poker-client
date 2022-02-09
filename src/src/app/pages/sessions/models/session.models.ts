export interface ISessionEvent {
  type: string;
  from: string;
  event: string;
  fromUserId?: string;
  group?: string;
  dataType?: string;
  data: any;
}

export interface ISessionJoinedEvent {
  session: string;
  userId: string;
  userName: string;
  vote?: number;
}
