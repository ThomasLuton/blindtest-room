import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SpotifyUser } from '../models/spotifyUser';
import { Observable } from 'rxjs';
import { SpotifyPlaylist } from '../models/spotifyPlaylist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private readonly http = inject(HttpClient);
  private readonly url = environment.spotifyAPI

  constructor() { }

  getUserPlaylists(): SpotifyPlaylist[] {
    var playlists: SpotifyPlaylist[] = []
    this.http.get<SpotifyUser>(this.url + "me").subscribe((me => {
      this.http.get<any>(this.url + "users/" + me.id + "/playlists").subscribe((resp) => {
        resp.items.forEach((el: SpotifyPlaylist) => {
          playlists.push(el);
        });
      })
    }))
    return playlists;
  }
}
