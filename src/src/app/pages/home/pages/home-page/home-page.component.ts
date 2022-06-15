import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  sessionCreate,
  sessionJoin,
} from 'src/app/state/session/session.actions';
import { SessionCreateDto } from 'src/app/state/session/session.models';
import { HomeCreateSessionDialogComponent } from '../../dialogs/home-create-session-dialog/home-create-session-dialog.component';
import { HomeJoinSessionDialogComponent } from '../../dialogs/home-join-session-dialog/home-join-session-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  public createSession() {
    let dialogRef = this.dialog.open(HomeCreateSessionDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let payload = new SessionCreateDto(result);
        if (payload.name) {
          localStorage.setItem('name', payload.name);
        }
        this.store.dispatch(sessionCreate({ dto: payload }));
      }
    });
  }
  public joinSession() {
    let dialogRef = this.dialog.open(HomeJoinSessionDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let payload = new SessionCreateDto(result);
        if (payload.name) {
          localStorage.setItem('name', payload.name);
        }
        this.store.dispatch(sessionJoin({ dto: payload }));
      }
    });
  }

  ngOnInit(): void {}
}
