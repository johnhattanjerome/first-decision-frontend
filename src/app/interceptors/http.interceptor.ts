import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpStatusInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((response: any) => {
        if (response.status === 201) {
          this.toastr.success('Registro inserido com sucesso!');
        }
      }),
      catchError((error) => {
        if (error.message && error.status !== 500 && error.status !== 0) {
          this.toastr.error(error.message, error.status);
        } else {
          this.toastr.error(
            'Não foi possível realizar essa operação. Contate o suporte.',
            error.status
          );
        }
        return throwError(error);
      })
    );
  }
}

export const HttpStatusInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpStatusInterceptor,
  multi: true,
};
