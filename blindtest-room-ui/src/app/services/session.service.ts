import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CodeSession } from '../models/codeSession';
import { Observable } from 'rxjs';
import { SessionInfo } from '../models/SessionInfo';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly http = inject(HttpClient);
  private readonly URL = environment.api;

  createSession(): Observable<SessionInfo> {
    return this.http.post<SessionInfo>(this.URL + "session/new", null);
  }

  getCurrentSession(): Observable<SessionInfo> {
    return this.http.get<SessionInfo>(this.URL + "session/current");
  }

  joinSession(code: number): Observable<any> {
    const codeSession: CodeSession = {
      code: code
    }
    return this.http.post<any>(this.URL + "public/join", codeSession);
  }
}
