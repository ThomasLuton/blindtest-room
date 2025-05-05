import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [],
  templateUrl: './lobby.component.html',
  styles: ``
})
export class LobbyComponent {

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router)
  readonly sessionId = Number(this.route.snapshot.paramMap.get('id'));
  private readonly sessionService = inject(SessionService);
  readonly session = toSignal(this.sessionService.joinSession(this.sessionId), {
    initialValue: {
      code: 0,
      step: 'Not found'
    }
  })
  constructor() {

  }
}
