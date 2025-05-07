import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { SpotifyService } from '../../services/spotify.service';
import { OverviewComponent } from '../overview/overview.component';
import { SessionService } from '../../services/session.service';
import { SessionInfo } from '../../models/SessionInfo';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [OverviewComponent, RouterLink],
  templateUrl: './control.component.html',
  styles: ``
})
export class ControlComponent {
  readonly router = inject(Router);
  readonly activatedRoute = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly spotify = inject(SpotifyService);
  private readonly session = inject(SessionService);

  logged = signal(!!localStorage.getItem('api-token'))
  spotifyLogged = signal(!!localStorage.getItem('spotifyAccessToken'));
  currentSession: WritableSignal<SessionInfo | null> = signal(null);
  redirectId = computed(() => '/overview/' + this.currentSession()?.code)

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
    this.session.getCurrentSession().subscribe((resp) => this.currentSession.set(resp));
  }

  logOut() {
    localStorage.removeItem('api-token');
    localStorage.removeItem('spotifyAccessToken');
    localStorage.removeItem('spotifyRefreshToken');
    this.logged.set(false);
    this.toast.success('toast-global', 'Bonne journée');
    this.router.navigate(["home"]);
  }

  createSession() {
    this.session.createSession().subscribe((resp) => this.currentSession.set(resp))
  }

  sessionClosed() {
    this.currentSession.set(null);
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
