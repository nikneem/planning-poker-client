import { Action, createReducer, on } from '@ngrx/store';
import { systemLanguage } from './system.actions';
import { INITIAL_SYSTEM_STATE, SystemState } from './system.state';

const _systemReducer = createReducer(
  INITIAL_SYSTEM_STATE,
  on(systemLanguage, (state, { language }) => ({
    ...state,
    language: language,
  }))
);
export function systemReducer(state: SystemState | undefined, action: Action) {
  return _systemReducer(state, action);
}
