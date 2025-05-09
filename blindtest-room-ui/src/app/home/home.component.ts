import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationComponent } from "../commons/navigation/navigation.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, NavigationComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  readonly router = inject(Router)
  form = new FormGroup(
    {
      sessionId: new FormControl<number | undefined>(undefined)
    }
  )

  onSubmit() {
    this.router.navigate(["/play/" + this.form.value.sessionId])
  }
}
