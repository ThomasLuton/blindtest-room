import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [],
  templateUrl: './lobby.component.html',
  styles: ``
})
export class LobbyComponent {

  readonly route = inject(ActivatedRoute);
  readonly sessionId = Number(this.route.snapshot.paramMap.get('id'));

}
