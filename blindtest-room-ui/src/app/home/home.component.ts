import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  readonly router = inject(Router)
  form = new FormGroup(
    {
      sessionId: new FormControl('')
    }
  )

  onSubmit() {
    this.router.navigate(["/play/" + this.form.value.sessionId])
  }
}
