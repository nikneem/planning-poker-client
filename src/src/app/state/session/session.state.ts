import { SessionParticipantDto } from './session.models';

export interface SessionState {
  code?: string;
  connectionUrl?: string;
  userId?: string;
  username?: string;
  participants: Array<SessionParticipantDto>;
  isOwner: boolean;
}

export const INITIAL_SESSION_STATE: SessionState = {
  participants: new Array<SessionParticipantDto>(),
  isOwner: false,
};
