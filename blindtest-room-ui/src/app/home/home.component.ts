import {Component, computed, inject, signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  logged = computed(() => !!localStorage.getItem('api-token'))
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
