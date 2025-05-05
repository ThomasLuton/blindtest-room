import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.api) || req.url.startsWith(environment.spotifyURL)) {
      const token = localStorage.getItem('api-token');
      if (token) {
        const reqWithHeader = req.clone({
          headers: req.headers.set('authorization', 'Bearer ' + token)
        })
        return next.handle(reqWithHeader);
      }
    }
    if (req.url.startsWith(environment.spotifyAPI)) {
      const token = localStorage.getItem('spotifyAccessToken');
      if (token) {
        const reqWithHeader = req.clone({
          headers: req.headers.set('authorization', 'Bearer ' + token)
        })
        return next.handle(reqWithHeader);
      }
    }

    return next.handle(req);
  }
}
