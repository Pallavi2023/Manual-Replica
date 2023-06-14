import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  tokenData: any;
  baseUrl: any;
  userInfo: any;

  constructor() {
    this.baseUrl = environment.apiUrl;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url != this.baseUrl + '/api/auth/login') {
      this.tokenData = localStorage.getItem('token')
      this.userInfo = localStorage.getItem('_UI')
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.tokenData),
      });
      return next.handle(request);
    }
    return next.handle(request);
  }
}
