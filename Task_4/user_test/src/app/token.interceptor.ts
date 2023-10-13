import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from 'src/services/user.service';
import { CacheHelper } from 'src/helpers/cache-helper';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const header = new HttpHeaders({ 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + CacheHelper.getToken() });

    const newRequest = request.clone({
      headers: header,
      params: request.params,
    })

    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          CacheHelper.removeToken();
          this.router.navigateByUrl('/login');
        }
        return throwError(error);
      }));
  }
}
