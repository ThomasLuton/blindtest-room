import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styles: ``
})
export class ControlComponent {

  logged = signal(!!localStorage.getItem('api-token'))
  readonly router = inject(Router)
  private readonly toast = inject(ToastService);
  private readonly spotify = inject(SpotifyService);

  logOut() {
    localStorage.removeItem('api-token');
    this.logged.set(false);
    this.toast.success('toast-global', 'Bonne journée');
    this.router.navigate(["home"]);
  }

  test() {
    this.spotify.getAccessToken().subscribe((resp) => console.log(resp))
  }
}
