import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SpotifyTokenInfo } from '../models/spotifyTokenInfo';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private readonly http = inject(HttpClient);
  private readonly URL = environment.spotify;

  getAccessToken(): Observable<SpotifyTokenInfo> {
    return this.http.get<SpotifyTokenInfo>(this.URL + 'test')
  }

}
