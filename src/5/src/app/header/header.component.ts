import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../auth/user';
import { Role } from '../auth/model/role.enum';
import { IAuthStatus } from '../auth/model/IAuthStatus'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `.angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    `
  ]
})
export class HeaderComponent implements OnInit {
  currentAuthStatus: IAuthStatus;

  constructor( private router: Router, private authService: AuthService
    ) {
        this.authService.currentAuthStatus.subscribe(y => this.currentAuthStatus = y);
   }

   ngOnInit() {
    //this.isLoggedIn$ = this.authService.isUserLoggedIn;
   }

   get isAdmin() {
    //console.log('HeaderComponent isAdmin currentAuthStatus userRole = ' + this.currentAuthStatus.userRole + ' Role.Admin = ' + Role.Admin);
    //return this.authService && this.authService.getUserRole() === Role.Admin;
    return this.currentAuthStatus && this.currentAuthStatus.userRole === Role.Admin;
   }

   get isNormalUser() {
    return this.currentAuthStatus && this.currentAuthStatus.userRole === Role.User;
   }

   get isManager() {
    return this.currentAuthStatus && this.currentAuthStatus.userRole === Role.Manager;
   }

   onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
   }

   onAdmin() {
    console.log('onAdmin');
    this.router.navigate(['/admin']);
   }

   onAdmin1() {
    this.router.navigate(['/pos']);
   }

}