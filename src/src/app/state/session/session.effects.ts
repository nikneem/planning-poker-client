import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { SessionsService } from 'src/app/services/sessions.service';
import {
  sessionCreate,
  sessionCreateFailed,
  sessionCreateOk,
  sessionJoin,
  sessionJoinGroup,
  sessionReset,
} from './session.actions';

@Injectable()
export class SessionEffects {
  constructor(
    private sessionsService: SessionsService,
    private actions$: Actions,
    private router: Router
  ) {}

  sessionCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sessionCreate),
      mergeMap((action) =>
        this.sessionsService.create(action.dto).pipe(
          map((payload) => {
            return sessionCreateOk({ dto: payload });
          }),
          tap(() => {
            this.router.navigate(['/session']);
          }),
          catchError((err) => {
            return of(
              sessionCreateFailed({
                errorMessage: 'Failure',
              })
            );
          })
        )
      )
    )
  );

  sessionJoin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sessionJoin),
      mergeMap((action) =>
        this.sessionsService.create(action.dto).pipe(
          map((payload) => {
            return sessionCreateOk({ dto: payload });
          }),
          tap(() => {
            this.router.navigate(['/session']);
          }),
          catchError((err) => {
            return of(
              sessionCreateFailed({
                errorMessage: 'Failure',
              })
            );
          })
        )
      )
    )
  );
}
