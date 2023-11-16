import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { ErrorHandlingService } from '../error-handling/error-handling.service';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private errorHandlingService: ErrorHandlingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handling based on different status codes
        switch (error.status) {
          case 0:
            this.errorHandlingService.displayError('No response from server. Check your network connection.');
            break;
          case 400:
            this.errorHandlingService.displayError('Bad Request. Your request might be too long. Please check if you have exceeded the word limit of 1000 and try again.');
            break;
          case 401:
            this.errorHandlingService.displayError('Unauthorized. Please sign in and try again.');
            break;
          case 403:
            this.errorHandlingService.displayError('Forbidden. You don’t have permission to access this.');
            break;
          case 404:
            this.errorHandlingService.displayError('Not Found. The requested resource could not be found.');
            break;
          case 429:
            this.errorHandlingService.displayError('Rate limit exceeded. You can only make 15 requests per day.');
            break;
          case 500:
            this.errorHandlingService.displayError('Internal Server Error. Please try again later.');
            break;
          case 503:
            this.errorHandlingService.displayError('Service Unavailable. The server is temporarily unavailable.');
            break;
          default:
            // General error message for other status codes
            this.errorHandlingService.displayError(`An unexpected error occurred. Please try again later`);
        }

        // Don't rethrow the error since it has been handled
        return EMPTY;
      })
    );
  }
}

