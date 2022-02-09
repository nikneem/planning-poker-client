import { sessionReducer } from './session/session.reducer';
import { INITIAL_SESSION_STATE, SessionState } from './session/session.state';
import { systemReducer } from './system/system.reducer';
import { INITIAL_SYSTEM_STATE, SystemState } from './system/system.state';

export interface AppState {
  systemState: SystemState;
  sessionState: SessionState;
}
export const INITIAL_APPSTATE: AppState = {
  systemState: INITIAL_SYSTEM_STATE,
  sessionState: INITIAL_SESSION_STATE,
};

export const reducers = {
  systemState: systemReducer,
  sessionState: sessionReducer,
};
