import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  logged = signal(!!localStorage.getItem('api-token'))
  readonly router = inject(Router)
  private readonly toast = inject(ToastService);
  form = new FormGroup(
    {
      sessionId: new FormControl('')
    }
  )

  onSubmit() {
    this.router.navigate(["/play/" + this.form.value.sessionId])
  }

  logOut() {
    localStorage.removeItem('api-token');
    this.logged.set(false);
    this.toast.success('toast-global', 'Bonne journée');
  }
}
