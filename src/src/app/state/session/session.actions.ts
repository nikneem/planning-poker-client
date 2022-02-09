import { createAction, props } from '@ngrx/store';
import { ISessionJoinedEvent } from 'src/app/pages/sessions/models/session.models';
import {
  SessionCreateDto,
  SessionDetailsDto,
  SessionJoinDto,
  SessionJoinGroupDto,
  SessionParticipantVoteDto,
} from './session.models';

export const sessionCreate = createAction(
  '[Session] Create',
  props<{ dto: SessionCreateDto }>()
);
export const sessionCreateOk = createAction(
  '[Session] Create OK',
  props<{ dto: SessionDetailsDto }>()
);
export const sessionCreateFailed = createAction(
  '[Session] Create Failed',
  props<{ errorMessage: string }>()
);

export const sessionJoin = createAction(
  '[Session] Join',
  props<{ dto: SessionJoinDto }>()
);
export const sessionJoinOk = createAction(
  '[Session] Join OK',
  props<{ dto: SessionDetailsDto }>()
);
export const sessionJoinFailed = createAction(
  '[Session] Join Failed',
  props<{ errorMessage: string }>()
);

export const sessionReset = createAction(
  '[Session] Reset',
  props<{ code: string }>()
);
export const sessionResetOk = createAction('[Session] Join OK');
export const sessionResetFailed = createAction(
  '[Session] Join Failed',
  props<{ errorMessage: string }>()
);

export const sessionJoinGroup = createAction(
  '[Session] JoinGroup',
  props<{ code: string; payload: SessionJoinGroupDto }>()
);

export const sessionAddParticipant = createAction(
  '[Session] AddParticipant',
  props<{ payload: ISessionJoinedEvent }>()
);

export const sessionParticipantVote = createAction(
  '[Session] ParticipantVote',
  props<{ payload: SessionParticipantVoteDto }>()
);
