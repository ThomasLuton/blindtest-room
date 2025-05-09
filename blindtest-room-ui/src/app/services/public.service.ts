import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodeSession } from '../models/codeSession';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { SessionInfo } from '../models/SessionInfo';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private readonly http = inject(HttpClient);
  private readonly URL = environment.api;

  getSessionInfo(code: number): Observable<SessionInfo> {
    return this.http.get<SessionInfo>(this.URL + "public/" + code);
  }

  getPlayers(code: number): Observable<Player[]> {
    return this.http.get<Player[]>(this.URL + "public/players/" + code);
  }

  joinSession(code: number, playerName: string): Observable<void> {
    const codeSession: CodeSession = {
      code: code,
      playerName: playerName
    }
    return this.http.post<void>(this.URL + "public/join", codeSession);
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

  leaveSession(code: number, playerName: string): Observable<void> {
    const codeSession: CodeSession = {
      code: code,
      playerName: playerName
    }
    return this.http.post<void>(this.URL + "public/leave", codeSession);
  }
}
