import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-confiq/app-config.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,) {

     }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const _AppConfigService = this.injector.get(AppConfigService);
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${_AppConfigService.getToken()}`,
      },
    });
    return next.handle(request);
  }
}
