import { Component, inject, input, output, signal } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Router, RouterLink } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  private readonly toast = inject(ToastService);
  private readonly spotify = inject(SpotifyService);
  readonly router = inject(Router);

  logged = signal(!!localStorage.getItem('api-token'))
  spotifyLogged = input<boolean>(false);
  spotifyDisconnected = output<void>();

  logOut() {
    localStorage.removeItem('api-token');
    localStorage.removeItem('spotifyAccessToken');
    localStorage.removeItem('spotifyRefreshToken');
    this.logged.set(false);
    this.toast.success('toast-global', 'Bonne journée');
    this.router.navigate(["home"]);
  }

  connectToSpotify() {
    const redirectURI = this.spotify.generateRedirectURI()
    location.assign(redirectURI);
  }

  disconnectToSpotify() {
    localStorage.removeItem('spotifyAccessToken');
    localStorage.removeItem('spotifyRefreshToken');
    this.toast.success('toast-global', 'Connection avec Spotify interrompu');
    this.spotifyDisconnected.emit();
  }
}
