import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Credential } from "../../models/credential";
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styles: ``
})
export class SignInComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private localStorageKey = 'api-token'

  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
  )

  onSubmit() {
    const isFormValid = this.form.valid;
    if (isFormValid) {
      const inputs: Credential = {
        email: this.form.value.email?.trim() as string,
        password: this.form.value.password?.trim() as string
      }
      this.authService.signIn(inputs).subscribe((resp) => {
        localStorage.setItem(this.localStorageKey, resp.token);
        this.toast.success("toast-global", "Bon retour");
        this.router.navigate([""]);
      })
    }
  }
}
