import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { SpotifyService } from '../../services/spotify.service';
import { OverviewComponent } from '../overview/overview.component';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [OverviewComponent, RouterLink],
  templateUrl: './control.component.html',
  styles: ``
})
export class ControlComponent {

  logged = signal(!!localStorage.getItem('api-token'))
  spotifyLogged = signal(!!localStorage.getItem('spotifyAccessToken'));
  sessionId = signal(234)
  redirectId = computed(() => '/overview/' + this.sessionId())
  readonly router = inject(Router);
  readonly activatedRoute = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly spotify = inject(SpotifyService);

  constructor() {
    this.activatedRoute.queryParamMap.subscribe(query => {
      const accessToken = query.get('access_token')
      const refreshToken = query.get('refresh_token')
      const errorMessage = query.get('error')

      if (errorMessage != null) {
        this.toast.error('toast-global', 'Problème lors de la connection avec Spotify')
      }
      if (accessToken != null && refreshToken != null) {
        this.spotify.storeTokens(accessToken, refreshToken)
        this.toast.success('toast-global', 'Connection avec Spotify réussi')
        this.spotifyLogged.set(true)
        this.router.navigate(['control'])
      }
    })
  }

  logOut() {
    localStorage.removeItem('api-token');
    localStorage.removeItem('spotifyAccessToken');
    localStorage.removeItem('spotifyRefreshToken');
    this.logged.set(false);
    this.toast.success('toast-global', 'Bonne journée');
    this.router.navigate(["home"]);
  }

  connectToSpotify() {
    window.location.href = this.spotify.generateRedirectURI();
  }

  disconnectToSpotify() {
    localStorage.removeItem('spotifyAccessToken');
    localStorage.removeItem('spotifyRefreshToken');
    this.toast.success('toast-global', 'Connection avec Spotify interrompu');
    this.spotifyLogged.set(false)
  }
}
