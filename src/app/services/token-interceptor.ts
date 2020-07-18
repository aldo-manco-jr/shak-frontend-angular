import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const header = {
      'content-type': 'application/json',
      'accept': 'application/json'
    };

    const token = this.tokenService.getToken();

    if (token) {
      header['authorization'] = `bearer ${token}`;
    }

    const reqWithToken = req.clone({setHeaders: header});
    return next.handle(reqWithToken);
  }
}
