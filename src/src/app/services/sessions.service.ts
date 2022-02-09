import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  SessionCreateDto,
  SessionDetailsDto,
  SessionJoinDto,
  SessionJoinGroupDto,
  SessionParticipantVoteDto,
} from '../state/session/session.models';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  private backendUrl: string;
  constructor(private http: HttpClient) {
    this.backendUrl = environment.backendUrl;
  }

  public create(dto: SessionCreateDto): Observable<SessionDetailsDto> {
    let url = `${this.backendUrl}/api/session`;
    return this.http.post<SessionDetailsDto>(url, dto);
  }
  public join(dto: SessionJoinDto): Observable<SessionDetailsDto> {
    let url = `${this.backendUrl}/api/session/${dto.code}`;
    return this.http.post<SessionDetailsDto>(url, dto);
  }
}
