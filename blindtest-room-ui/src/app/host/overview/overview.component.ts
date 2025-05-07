import { Component, computed, inject, input, WritableSignal, output, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StompService } from '../../services/stomp.service';
import { HttpClient } from '@angular/common/http';
import { Message } from '@stomp/stompjs';
import { SessionService } from '../../services/session.service';
import { ToastService } from '../../services/toast.service';
import { PlaylistService } from '../../services/playlist.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SessionInfo } from '../../models/SessionInfo';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './overview.component.html',
  styles: ``
})
export class OverviewComponent {
  private readonly route = inject(ActivatedRoute)
  private readonly stomp = inject(StompService);
  private readonly session = inject(SessionService);
  private readonly toast = inject(ToastService);
  private readonly playlist = inject(PlaylistService)

  sessionClosed = output<void>();
  sessionIdInput = input<number>()

  sessionId = computed(() => {
    if (this.sessionIdInput()) {
      return this.sessionIdInput()
    } else {
      return this.route.snapshot.paramMap.get('id')
    }
  })
  currentSession: WritableSignal<SessionInfo | null> = signal(null);
  redirectId = computed(() => '/overview/' + this.sessionId())
  offset = signal(0);
  playlists = computed(() => this.playlist.getUserPlaylists(this.offset()));



  constructor() {
    this.session.getCurrentSession().subscribe((res) => this.currentSession.set(res));
    this.stomp.watch('/topic/test').subscribe((msg: Message) => {
      console.log(msg.body);
    })
  }

  closeSession() {
    this.session.closeCurrentSession().subscribe(() => {
      this.sessionClosed.emit();
      this.toast.success("toast-global", "Session fermé avec succès");
    })
  }

  nextPage() {
    this.offset.update((value) => value += 5);
  }

  previousPage() {
    this.offset.update((value) => value -= 5);
  }

  isActivated(id: string): string {
    return id === this.currentSession()?.playlist ? "active list-group-item" : "list-group-item"
  }

  updatePlaylist(id: string): void {
    this.session.updatePlaylist(id).subscribe((res) => this.currentSession.set(res));
  }
}
