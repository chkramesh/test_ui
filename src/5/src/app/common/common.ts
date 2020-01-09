import { HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs'

export function transformError(error: HttpErrorResponse | string) { 
  let errorMessage = 'An unknown error has occurred'
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error.error instanceof ErrorEvent) {
    errorMessage = `Error! ${error.error.message}`;
  } else if (error.status) {    
    errorMessage = `Request failed with error status code ${error.status} ${error.statusText}`;
    console.log("Common transformError 2 body was = " + JSON.stringify(error.error));
    console.error('Common transformError 3 ######### errorMessage == ' + errorMessage);
    if (error.status === 401) { 
      errorMessage = "Invalid credentials or Token might have been expired! So please login again!"; 
    }

  }
  return throwError(errorMessage)
}
