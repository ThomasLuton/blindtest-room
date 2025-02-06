import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {catchError, Observable, of} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {ToastService} from "../services/toast.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  readonly toast = inject(ToastService);
  intercept(req: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<unknown>> {
    return handler.handle(req).pipe(catchError((res) => {
      this.toast.error("toast-global", res.error.message)
      return of(res)
  }))
  }
}
