import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private readonly http = inject(HttpClient);
  private readonly URL = environment.spotifyURL;

  private sendState(state: string): void {
    this.http.post(this.URL + 'send-state', { state: state }).subscribe();
  }

  private createHash(length: number): string {
    return self.crypto.randomUUID().slice(0, length);
  }

  generateRedirectURI(): string {
    const state = this.createHash(16);
    const scope = 'user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative';
    const clientId = environment.spotifyClientId;
    const redirectURI = encodeURIComponent(this.URL + 'callback');
    this.sendState(state);
    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURI}&state=${state}`
  }

  storeTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('spotifyAccessToken', accessToken);
    localStorage.setItem('spotifyRefreshToken', refreshToken);
  }

}
