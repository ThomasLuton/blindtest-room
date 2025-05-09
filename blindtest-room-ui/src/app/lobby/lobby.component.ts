import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicService } from '../services/public.service';
import { StompService } from '../services/stomp.service';
import { Message } from '@stomp/stompjs';
import { SessionInfo } from '../models/SessionInfo';
import { Player } from '../models/player';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lobby.component.html',
  styles: ``
})
export class LobbyComponent implements OnDestroy {

  private readonly playerNameStorageKey = 'playerName'
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router)
  private readonly stomp = inject(StompService);
  private readonly toast = inject(ToastService);
  readonly sessionId = Number(this.route.snapshot.paramMap.get('id'));
  private readonly publicService = inject(PublicService);
  sessionInfo: WritableSignal<SessionInfo | null> = signal(null);
  playerName: WritableSignal<string> = signal("");
  players: WritableSignal<Player[]> = signal([]);
  form = new FormGroup(
    {
      newName: new FormControl('', [Validators.required])
    }
  )
  constructor() {
    this.publicService.getSessionInfo(this.sessionId).subscribe((resp) => {
      this.sessionInfo.set(resp);
    })
    this.publicService.getPlayers(this.sessionId).subscribe((res) => {
      this.players.set(res);
      var player = localStorage.getItem(this.playerNameStorageKey);
      if (!!player) {
        this.playerName.set(player);
      } else {
        this.playerName.set("Joueur " + res.length);
      }
      this.publicService.joinSession(this.sessionId, this.playerName()).subscribe(() => {
        localStorage.setItem(this.playerNameStorageKey, this.playerName());
      });
    })
    this.stomp.watch('/topic/' + this.sessionId).subscribe((msg: Message) => {
      this.publicService.getPlayers(this.sessionId).subscribe((res) => {
        this.players.set(res);
        this.toast.info("toast-global", msg.body)
      })
    })
  }

  onSubmit() {
    const isFormValid = this.form.valid;
    if (isFormValid) {
      const newName = this.form.value.newName?.trim() as string;
      this.publicService.updatePlayerName(this.sessionId, this.playerName(), newName).subscribe(() => {
        this.playerName.set(newName);
        localStorage.setItem(this.playerNameStorageKey, newName);
      });
    }
  }

  onLeave() {
    localStorage.setItem(this.playerNameStorageKey, "");
    this.router.navigate(["home"])
  }

  ngOnDestroy(): void {
    this.publicService.leaveSession(this.sessionId, this.playerName()).subscribe();
  }
}
