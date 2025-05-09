import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { PublicInfo } from '../models/PublicInfo';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lobby.component.html',
  styles: ``
})
export class LobbyComponent {

  private readonly playerNameStorageKey = 'playerName'
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router)
  readonly sessionId = Number(this.route.snapshot.paramMap.get('id'));
  private readonly sessionService = inject(SessionService);
  publicInfo: WritableSignal<PublicInfo | null> = signal(null);
  playerName: WritableSignal<string> = signal("");
  form = new FormGroup(
    {
      newName: new FormControl('', [Validators.required])
    }
  )
  constructor() {
    const storedName = localStorage.getItem(this.playerNameStorageKey);
    if (storedName != null) {
      this.playerName.set(storedName);
    }
    this.sessionService.joinSession(this.sessionId, this.playerName()).subscribe((res) => {
      this.publicInfo.set(res);
      this.playerName.set(res.playerName);
      localStorage.setItem(this.playerNameStorageKey, res.playerName);
    });
  }

  onSubmit() {
    const isFormValid = this.form.valid;
    if (isFormValid) {
      const newName = this.form.value.newName?.trim() as string;
      console.log(this.playerName())
      this.sessionService.updatePlayerName(this.sessionId, this.playerName(), newName).subscribe(() => {
        this.playerName.set(newName);
        localStorage.setItem(this.playerNameStorageKey, newName);
      });
    }
  }



  onLeave() {

  }
}
