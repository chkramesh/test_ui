import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentAuthStatus = this.authService.currentAuthStatusValue;
    console.log('AuthGuard canActivate ################ currentAuthStatus.isAuthenticated = ' + currentAuthStatus.isAuthenticated);
    //if (currentAuthStatus) {
    if (currentAuthStatus.isAuthenticated) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(currentAuthStatus.userRole) === -1) {
            // role not authorised so redirect to home page
            this.router.navigate(['/']);
            return false;
        }

        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {   
  //     return this.authService.isUserLoggedIn.pipe(      
  //     take(1),
  //     map((isLoggedIn: boolean) => {
  //       console.log('AuthGuard canActivate isLoggedIn = ' + isLoggedIn);
  //       if (!isLoggedIn) {
  //         this.router.navigate(['/login']);
  //         return false;
  //       }
  //       return true;
  //     })
  //   );
  // }


}