import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {ToastComponent} from "./commons/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blindtest-room';
}
