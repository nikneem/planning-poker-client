import { Action, createReducer, on } from '@ngrx/store';
import { ISessionJoinedEvent } from 'src/app/pages/sessions/models/session.models';
import {
  sessionAddParticipant,
  sessionCreateOk,
  sessionParticipantVote,
  sessionRemoveParticipant,
  sessionReset,
} from './session.actions';
import {
  SessionParticipantDto,
  SessionParticipantVoteDto,
} from './session.models';
import { INITIAL_SESSION_STATE, SessionState } from './session.state';

const _sessionReducer = createReducer(
  INITIAL_SESSION_STATE,
  on(sessionCreateOk, (state, { dto }) => ({
    ...state,
    code: dto.code,
    connectionUrl: dto.connectionUrl,
    userId: dto.userId,
    username: dto.username,
  })),
  on(sessionAddParticipant, (state, { payload }) =>
    addSessionParticipant(state, payload)
  ),
  on(sessionParticipantVote, (state, { payload }) =>
    handleSessionParticipantVote(state, payload)
  ),
  on(sessionRemoveParticipant, (state, { userId }) =>
    handleSessionRemoveParticipant(state, userId)
  ),
  on(sessionReset, (state) => resetAllParticipants(state))
);

function addSessionParticipant(
  state: SessionState,
  participant: ISessionJoinedEvent
): SessionState {
  const copyState: SessionState = Object.assign({}, state);
  let occupations = copyState.participants
    ? new Array<SessionParticipantDto>(...copyState.participants)
    : new Array<SessionParticipantDto>();

  let existingParticipant = occupations.find(
    (p) => p.userId === participant.userId
  );
  if (!existingParticipant) {
    occupations.push(
      new SessionParticipantDto(participant.userId, participant.userName)
    );
    copyState.participants = occupations;
  } else {
    let position = occupations.indexOf(existingParticipant);
    let newParticipant = new SessionParticipantDto(
      participant.userId,
      participant.userName
    );
    newParticipant.currentVote = participant.vote;
    occupations.splice(position, 1, newParticipant);
  }
  copyState.participants = occupations;
  return copyState;
}

function handleSessionParticipantVote(
  state: SessionState,
  participant: SessionParticipantVoteDto
): SessionState {
  const copyState: SessionState = Object.assign({}, state);
  let occupations = copyState.participants
    ? new Array<SessionParticipantDto>(...copyState.participants)
    : new Array<SessionParticipantDto>();
  let existingParticipant = occupations.find(
    (p) => p.userId === participant.userId
  );
  if (existingParticipant) {
    let position = occupations.indexOf(existingParticipant);
    let newParticipant = new SessionParticipantDto(
      existingParticipant.userId,
      existingParticipant.name
    );
    newParticipant.currentVote = participant.vote;
    occupations.splice(position, 1, newParticipant);
  }
  copyState.participants = occupations;
  return copyState;
}

function handleSessionRemoveParticipant(
  state: SessionState,
  userId: string
): SessionState {
  const copyState: SessionState = Object.assign({}, state);
  let occupations = copyState.participants
    ? new Array<SessionParticipantDto>(...copyState.participants)
    : new Array<SessionParticipantDto>();
  let existingParticipant = occupations.find((p) => p.userId === userId);
  if (existingParticipant) {
    let position = occupations.indexOf(existingParticipant);
    occupations.splice(position, 1);
  }
  copyState.participants = occupations;
  return copyState;
}

function resetAllParticipants(state: SessionState): SessionState {
  const copyState: SessionState = Object.assign({}, state);
  let occupations = new Array<SessionParticipantDto>();

  copyState.participants.forEach((elm, index) => {
    let newParticipant = new SessionParticipantDto(elm.userId, elm.name);
    occupations.push(newParticipant);
  });
  copyState.participants = occupations;
  return copyState;
}

export function sessionReducer(
  state: SessionState | undefined,
  action: Action
) {
  return _sessionReducer(state, action);
}
