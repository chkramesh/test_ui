import { Route } from '@angular/compiler/src/core'
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'

import { UiService } from '../common/ui.service'
import { AuthService } from './auth.service';

import { Role } from '../auth/model/role.enum';
import { IAuthStatus } from '../auth/model/IAuthStatus';
import { User } from '../auth/model/user';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  protected currentAuthStatus: IAuthStatus
  constructor(
    protected authService: AuthService,
    protected router: Router,
    private uiService: UiService
  ) {
    // this.authService.authStatus.subscribe(
    this.authService.currentAuthStatus.subscribe(
      authStatus => (this.currentAuthStatus = authStatus)
    )
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    console.log('AuthGuard checkLogin !!!!!!!!!!!!!!!!! 1');
    return this.checkLogin()
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log('AuthGuard checkLogin !!!!!!!!!!!!!!!!! 2');
    return this.checkLogin(route)
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log('AuthGuard checkLogin !!!!!!!!!!!!!!!!! 3');
    return this.checkLogin(childRoute)
  }

  protected checkLogin(route?: ActivatedRouteSnapshot) {
    console.log('AuthGuard checkLogin !!!!!!!!!!!!!!!!! 4');
    let roleMatch = true
    let params: any
    if (route) {
      const expectedRole = route.data.expectedRole
      console.log('AuthGuard checkLogin !!!!!!!!!!!!!!!!! 1 expectedRole = ' + expectedRole + ' roleMatch = ' + roleMatch);
       
      if (expectedRole) {
        roleMatch = this.currentAuthStatus.userRole === expectedRole
      }

      console.log('AuthGuard checkLogin !!!!!!!!!!!!!!!!! 2 expectedRole = ' + expectedRole + ' roleMatch = ' + roleMatch);

      if (roleMatch) {
        params = { redirectUrl: route.pathFromRoot.map(r => r.url).join('/') }
      }
    }
    // console.log('AuthGuard ########## 1 roleMatch = ' + roleMatch);
    // console.log('AuthGuard ########## 1 params = ' + params);
    console.dir(params);
    // redirectUrl: "/manager//home

    if (!this.currentAuthStatus.isAuthenticated || !roleMatch) {
      console.log('AuthGuard ########## 2');
      this.showAlert(this.currentAuthStatus.isAuthenticated, roleMatch)

      // console.log('AuthGuard ########## 3 params = ' + params);

      this.router.navigate(['login', params])
      return false
    }

    return true
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue')
    }

    if (!roleMatch) {
      this.uiService.showToast('You do not have the permissions to view this resource')
    }
  }
}


// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map, take } from 'rxjs/operators';

// import { AuthService } from './auth.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const currentAuthStatus = this.authService.currentAuthStatusValue;
//     console.log('AuthGuard canActivate ################ currentAuthStatus.isAuthenticated = ' + currentAuthStatus.isAuthenticated);
//     //if (currentAuthStatus) {
//     if (currentAuthStatus.isAuthenticated) {
//         // check if route is restricted by role
//         if (route.data.roles && route.data.roles.indexOf(currentAuthStatus.userRole) === -1) {
//             // role not authorised so redirect to home page
//             this.router.navigate(['/']);
//             return false;
//         }

//         // authorised so return true
//         return true;
//     }

//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
//     return false;
//   }
// }