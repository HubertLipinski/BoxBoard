import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthServiceService} from '../../services/auth-service.service';
import {TokenService} from '../../services/token.service';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authServiceService: AuthServiceService,
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authServiceService.currentUserValue;
    console.log('intercepted request!', this.tokenService.get());
    if (currentUser && this.tokenService.exists()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tokenService.get()}`
        }
      });
    }

    return next.handle(request);
  }
}
