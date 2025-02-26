import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styles: ``
})
export class OverviewComponent {

  private readonly route = inject(ActivatedRoute)
  sessionIdInput = input<number>()
  sessionId = computed(() => {
    if (this.sessionIdInput()) {
      return this.sessionIdInput()
    } else {
      return this.route.snapshot.paramMap.get('id')
    }
  })
}
