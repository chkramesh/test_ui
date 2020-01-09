
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
// import { TokenStorage } from './token.storage';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { LoaderService } from '../base/loader.service';
import { AuthService } from './auth.service';
// import { LoginResponse } from '../partner/model/login-response.model';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
// @Injectable({
// 	providedIn: 'root',
// })

export class AuthHttpInterceptor  implements HttpInterceptor {   
    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;        
        const jwt = this.authService.getToken();
        console.log('AuthHttpInterceptor jwt token = ' + jwt);
        console.log("AuthHttpInterceptor jwt = " + jwt);

        if (this.authService.getToken() != null) {           
            // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.authService.getToken()) });
            authReq = req.clone({ setHeaders: { TOKEN_HEADER_KEY: `Bearer ${jwt}` } })
        }
        console.debug("headers :"+JSON.stringify(authReq));
       
        ////this.loaderService.display(true);  
        return next.handle(authReq).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('event--->>>', event);

                if (event instanceof HttpResponse) {
                  console.log("Service Response thr Interceptor");
                }
                // this.errorDialogService.openDialog(event);
                ///this.loaderService.display(false);
                console.debug('response headers',event.headers.keys())
                 if(event.headers.get("auth-token")){
                  // console.log('token ===================== ',event.headers.get("auth-token"));
                   /////this.authService.saveToken(event.headers.get("auth-token"));
                 }
            }
            return event;
        }), catchError((err: HttpErrorResponse) => {
            /////this.loaderService.display(false);
            console.log("AuthHttpInterceptor err.status  = " + err.status );

            if (err instanceof HttpErrorResponse) {
                let errMsg = '';
                // Client Side Error
                if (err.error instanceof ErrorEvent) {		
                  errMsg = `Error: ${err.error.message}`;
                } 
                else {  // Server Side Error
                  errMsg = `Error Code: ${err.status},  Message: ${err.message}`;
                  console.log("errMsg ===== " + errMsg)

                  if (err.status === 401) {                   
                     console.log("Backend returned code = "+ err.status + " body was = "+JSON.stringify(err.error)); 
                     console.log("Unauthorized as token expired");
                     this.authService.logout();
                                    
                     let navigationExtras: NavigationExtras = {queryParamsHandling: 'preserve', preserveFragment: true}; 
                     let errorMsg = "Invalid credentials or Token might have been expired! So please login again!";                    
                     this.router.navigate(['login',{errorMsg: errorMsg} ], navigationExtras);
 
                     // this.router.navigate(['/login'], {
                     // this.router.navigate(['/login', {errorMsg: errorMsg} ], {
                     //  queryParams: { redirectUrl: this.router.routerState.snapshot.url },
                     // })
 
                     //return throwError(err);
                     //return throwError(errMsg);
                     return throwError(errorMsg);
                 }
                 else {
                     return throwError(err);
                     //return throwError(errMsg);
                     //return throwError(errorMsg);
                 }

                }
            }

            
        }));
    }
}


/*
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, throwError as observableThrowError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { AuthService } from './auth.service'

// RC::
//import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authService.getToken();
    console.log('AuthHttpInterceptor jwt token = ' + jwt);
    // const jwt = this.tokenStorageService.getToken();

    const authRequest = req.clone({ setHeaders: { authorization: `Bearer ${jwt}` } })
    return next.handle(authRequest).pipe(
      catchError((err, caught) => {
        if (err.status === 401) {
          this.router.navigate(['/login'], {
            queryParams: { redirectUrl: this.router.routerState.snapshot.url },
          })
        }

        return observableThrowError(err)
      })
    )
  }
}
*/