
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
// import { TokenStorage } from './token.storage';
//import { Observable, throwError as observableThrowError } from 'rxjs'
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
//import { map } from 'rxjs/operators';
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

        if (this.authService.getToken() != null) {    
            authReq = req.clone({ setHeaders: { TOKEN_HEADER_KEY: `Bearer ${jwt}` } })
        }
               
        ////this.loaderService.display(true);  
        return next.handle(authReq).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('AuthHttpInterceptor event--->>>', event);

                // this.errorDialogService.openDialog(event);
                ///this.loaderService.display(false);
                console.debug('response headers',event.headers.keys())
                 if(event.headers.get("auth-token")){
                  console.log('token ===================== ',event.headers.get("auth-token"));
                   this.authService.saveToken(event.headers.get("auth-token"));
                 }
            }
            return event;
        }), catchError((err, caught) => {
       // }), catchError((err: HttpErrorResponse) => {
            /////this.loaderService.display(false);
            console.log("AuthHttpInterceptor catchError");
            if (err.status === 401) {             
              console.log("Unauthorized as token expired");
              this.authService.logout();

              this.router.navigate(['/login'], {
                queryParams: { redirectUrl: this.router.routerState.snapshot.url },
              })
            }    
            //return observableThrowError(err);
            return throwError(err);            
        }));
    }      
}
