import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { catchError, Observable, of } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { ToastService } from "../services/toast.service";
import { environment } from '../../environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  readonly toast = inject(ToastService);
  intercept(req: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<unknown>> {
    return handler.handle(req).pipe(catchError((res) => {
      var toastMessage = "";
      if (req.url.startsWith(environment.spotifyAPI)) {
        toastMessage = res.error.error.message
      }
      if (req.url.startsWith(environment.api)) {
        toastMessage = res.error.message
      }
      this.toast.error("toast-global", toastMessage)
      return of(res)
    }))
  }
}
