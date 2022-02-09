import { createAction, props } from '@ngrx/store';

export const systemLanguage = createAction(
  '[System] SetLanguage',
  props<{ language: string }>()
);
