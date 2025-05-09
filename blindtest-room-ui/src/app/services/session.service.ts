import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CodeSession } from '../models/codeSession';
import { Observable } from 'rxjs';
import { SessionInfo } from '../models/SessionInfo';
import { PublicInfo } from '../models/PublicInfo';

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

  closeCurrentSession(): Observable<void> {
    return this.http.put<void>(this.URL + "session/current/close", null);
  }

  updatePlaylist(id: string): Observable<SessionInfo> {
    return this.http.put<SessionInfo>(this.URL + "session/current/playlist", { playlist: id });
  }

  joinSession(code: number, playerName: string): Observable<PublicInfo> {
    const codeSession: CodeSession = {
      code: code,
      playerName: playerName
    }
    return this.http.post<PublicInfo>(this.URL + "public/join", codeSession);
  }

  updatePlayerName(code: number, oldName: string, newName: string): Observable<void> {
    const input = {
      codeSession: {
        code: code,
        playerName: oldName
      },
      newName: newName
    }
    return this.http.put<void>(this.URL + "public/update-name", input);
  }
}
