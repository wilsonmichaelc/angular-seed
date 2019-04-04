import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

/**
 * Adds the local storage token to the headers
 */
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = '';
    token = this.authService.getIdToken();
    const clonedRequest = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
    return next.handle(clonedRequest);
  }
}
