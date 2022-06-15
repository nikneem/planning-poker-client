import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { AppState } from 'src/app/state/app.state';
import {
  sessionAddParticipant,
  sessionParticipantVote,
  sessionRemoveParticipant,
  sessionReset,
} from 'src/app/state/session/session.actions';
import {
  SessionParticipantDto,
  SessionParticipantVoteDto,
} from 'src/app/state/session/session.models';
import {
  ISessionEvent,
  ISessionJoinedEvent,
} from '../../models/session.models';

@Component({
  selector: 'app-session-page',
  templateUrl: './session-page.component.html',
  styleUrls: ['./session-page.component.scss'],
})
export class SessionPageComponent implements OnInit, OnDestroy {
  public votables: Array<number> = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];
  public sessionCode?: string;
  private webPubSubUrl?: string;
  private websocket?: WebSocket;
  private sessionSubscription?: Subscription;
  public userId?: string;
  public username?: string;
  public participants?: Array<SessionParticipantDto>;
  public currentVote?: number;
  public state: string = 'normal';
  public voting: boolean = true;
  public isOwner: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  reset() {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket?.send(
        JSON.stringify({
          type: 'sendToGroup',
          group: this.sessionCode,
          noEcho: false,
          dataType: 'json',
          data: {
            event: 'reset',
            session: this.sessionCode,
          },
        })
      );
    }
  }
  castVote(vote: number) {
    this.currentVote = vote;
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket?.send(
        JSON.stringify({
          type: 'sendToGroup',
          group: this.sessionCode,
          noEcho: false,
          dataType: 'json',
          data: {
            event: 'vote',
            session: this.sessionCode,
            userId: this.userId,
            userName: this.username,
            vote: this.currentVote,
          },
        })
      );
    }
  }
  private sayHi(participants: Array<SessionParticipantDto>) {
    let sayHi = this.participants?.length != participants.length;
    this.participants = _.sortBy(participants, ['name']);

    if (
      sayHi &&
      this.websocket &&
      this.websocket.readyState === WebSocket.OPEN
    ) {
      this.websocket?.send(
        JSON.stringify({
          type: 'sendToGroup',
          group: this.sessionCode,
          noEcho: true,
          dataType: 'json',
          data: {
            event: 'joined',
            session: this.sessionCode,
            userId: this.userId,
            userName: this.username,
            vote: this.currentVote,
          },
        })
      );
    }
  }

  private connect() {
    if (this.webPubSubUrl && this.sessionCode) {
      if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
        let self = this;

        this.websocket = new WebSocket(
          this.webPubSubUrl,
          'json.webpubsub.azure.v1'
        );
        this.websocket.onopen = (evt) => {
          if (self.userId && self.sessionCode) {
            console.log('joining group');
            this.websocket?.send(
              JSON.stringify({
                type: 'joinGroup',
                group: self.sessionCode,
                ackId: 1,
              })
            );
            console.log('sending group');
            this.websocket?.send(
              JSON.stringify({
                type: 'sendToGroup',
                group: self.sessionCode,
                noEcho: false,
                dataType: 'json',
                data: {
                  event: 'joined',
                  session: self.sessionCode,
                  userId: self.userId,
                  userName: self.username,
                },
              })
            );
          }
        };
        this.websocket.onmessage = (msg) => {
          this.handleRealTimeMessage(JSON.parse(msg.data));
        };
      }
    }
  }

  handleRealTimeMessage(data: ISessionEvent) {
    if (data.type === 'message') {
      if (data.from === 'group' && data.group === this.sessionCode) {
        console.log(data.data.event);
        if (data.data.event === 'joined') {
          let eventData = data.data as ISessionJoinedEvent;
          let broadcast = true;
          if (this.participants) {
            let existingParticipant = this.participants.find(
              (p) => p.userId === data.data.userId
            );
            broadcast =
              existingParticipant === null || existingParticipant === undefined;
          }
          if (broadcast) {
            this.store.dispatch(sessionAddParticipant({ payload: eventData }));
          }
        }
        if (data.data.event === 'leave') {
          this.store.dispatch(
            sessionRemoveParticipant({ userId: data.data.userId })
          );
        }
        if (data.data.event === 'vote') {
          let eventData = new SessionParticipantVoteDto(
            data.data.userId,
            data.data.vote
          );
          this.store.dispatch(sessionParticipantVote({ payload: eventData }));
        }
        if (data.data.event === 'reset') {
          this.currentVote = undefined;
          if (this.sessionCode) {
            this.store.dispatch(sessionReset({ code: this.sessionCode }));
          }
        }
      }
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket?.send(
        JSON.stringify({
          type: 'sendToGroup',
          group: this.sessionCode,
          noEcho: false,
          dataType: 'json',
          data: {
            event: 'leave',
            session: this.sessionCode,
            userId: this.userId,
          },
        })
      );
      this.websocket?.send(
        JSON.stringify({
          type: 'leaveGroup',
          group: this.sessionCode,
          ackId: 1,
        })
      );

      this.websocket.close();
    }
  }

  ngOnInit(): void {
    this.sessionSubscription = this.store
      .select((str) => str.sessionState)
      .subscribe((val) => {
        this.sayHi(val.participants);
        this.voting = val.participants.some(
          (elm) => elm.currentVote === undefined
        );
        this.sessionCode = val.code;
        this.webPubSubUrl = val.connectionUrl;
        this.userId = val.userId;
        this.username = val.username;
        this.isOwner = val.isOwner;
        if (this.sessionCode) {
          this.connect();
        } else {
          this.router.navigate(['/home']);
        }
      });
  }
  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }
}
