import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  SessionCreateDto,
  SessionDetailsDto,
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
}
