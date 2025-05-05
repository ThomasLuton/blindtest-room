import { Component, computed, inject, input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StompService } from '../../services/stomp.service';
import { HttpClient } from '@angular/common/http';
import { Message } from '@stomp/stompjs';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styles: ``
})
export class OverviewComponent {

  private readonly route = inject(ActivatedRoute)
  private readonly stomp = inject(StompService);
  private readonly http = inject(HttpClient);
  sessionIdInput = input<number>()
  sessionId = computed(() => {
    if (this.sessionIdInput()) {
      return this.sessionIdInput()
    } else {
      return this.route.snapshot.paramMap.get('id')
    }
  })

  constructor() {
    this.stomp.watch('/topic/test').subscribe((msg: Message) => {
      // console.log(msg.body);
    })
  }

  onTest() {
    this.http.get("http://localhost:8080/session").subscribe();
  }
}
