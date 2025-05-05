import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CodeSession } from '../models/codeSession';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly http = inject(HttpClient);
  private readonly URL = environment.api;

  createSession(): Observable<CodeSession> {
    return this.http.post<CodeSession>(this.URL + "session/new", null);
  }

  joinSession(code: number): Observable<any> {
    const codeSession: CodeSession = {
      code: code
    }
    return this.http.post<any>(this.URL + "public/join", codeSession);
  }
}
