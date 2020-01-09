
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { first } from 'rxjs/operators';
import { catchError} from 'rxjs/operators'

import { AuthService } from '../auth/auth.service'
//import { Role } from '../auth/role.enum'
//import { UiService } from '../common/ui.service'
import { EmailValidation, PasswordValidation } from '../common/validations'
import { IAuthStatus } from '../auth/model/IAuthStatus';

// RC::
import { AuthLoginInfo } from '../auth/model/login-info';
//import { LoginResponse } from '../auth/model/login-response.model';
import { NavigationExtras } from '@angular/router';
//import { TokenStorageService } from '../auth/token-storage.service';
import { BehaviorSubject, Observable } from "rxjs";
import { Role } from '../auth/model/role.enum';
import { transformError } from '../common/common';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
  // styles: [
  //   `
  //     .error {
  //       color: red;
  //     }
  //   `,
  //   `
  //     div[fxLayout] {
  //       margin-top: 32px;
  //     }
  //   `,
  //],
})
export class LoginComponent implements OnInit {
  // RC::
  private loginInfo: AuthLoginInfo;
  errorMsg: string;   
  returnUrl: string;  
  loginError = '';
  redirectUrl;
  // myRoles: string[] = [];
  myRoles: Array<string> = [];

  loginForm: FormGroup
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    //private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    //private uiService: UiService
  ) {
    console.log('LoginComponent constructor authService.currentAuthStatusValue = ' + authService.currentAuthStatusValue);
    console.log('LoginComponent constructor authService.currentAuthStatusValue.isAuthenticated = ' + authService.currentAuthStatusValue.isAuthenticated);

    // redirect to home if already logged in
    // if (this.authService.currentAuthStatusValue.isAuthenticated) { 
    //   this.router.navigate(['/']);
    // }
    // route.paramMap.subscribe(params => (this.redirectUrl = params.get('redirectUrl')))
  }

  ngOnInit() {
    this.buildLoginForm();
     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })
  }

  async login(submittedForm: FormGroup) {
     //console.log('submit login email = ' + submittedForm.value.email + ' password = ' + submittedForm.value.password);

     this.loginInfo = new AuthLoginInfo(
        submittedForm.value.email,
        submittedForm.value.password);

        //this.authService.login(this.loginInfo).subscribe(
        this.authService.login(this.loginInfo)
        .pipe(first())
        .subscribe(
          authStatus => {
            console.dir(authStatus);
            console.log("LoginComponent resp isAuthenticated = " + authStatus.isAuthenticated);
            //////console.log("LoginComponent resp isAuthenticated = " + authStatus.isAuthenticated + ' getAuthorities()[0] =' +this.authService.getAuthorities()[0]);
            console.log("LoginComponent resp userRole = " + authStatus.userRole);
           
            this.myRoles = this.authService.getAuthorities();
            // console.log('LoginComponent isAdmin getAuthorities = ' + this.authService.getAuthorities()[0]);
            console.log('LoginComponent onSubmit this.myRoles = ' + this.myRoles + ' this.roles[0] = ' + this.myRoles[0]);
            
            //this.reloadPage();           
            this.router.navigate(['/home'])
            // this.router.navigate([this.returnUrl]);

            // if (authStatus.isAuthenticated) {
            //   this.uiService.showToast(`Welcome! Role: ${authStatus.userRole}`)
            //   this.router.navigate([
            //     this.redirectUrl || this.homeRoutePerRole(authStatus.userRole),
            //   ])
            // }
          },
          // error => (this.loginError = error)         
          error => {
            ///////console.log('LoginComponent error == '+ error);
            console.dir(error);            
            //this.errorMsg = error;           
            // this.loading = false;
            console.log('LoginComponent error == '+ error);
            //console.log('LoginComponent error.status = '+ error.status);
            //console.log('LoginComponent error.error.message = '+ error.error.message);
          }
        );
  }

//   async login(submittedForm: FormGroup) {
//     //console.log('submit login email = ' + submittedForm.value.email + ' password = ' + submittedForm.value.password);

//     this.loginInfo = new AuthLoginInfo(
//        submittedForm.value.email,
//        submittedForm.value.password);

//        //this.authService.login(this.loginInfo).subscribe(
//        this.authService.login(this.loginInfo)
//        .pipe(first())
//        .subscribe(
//          authStatus => {
//            console.dir(authStatus);
//            console.log("LoginComponent resp isAuthenticated = " + authStatus.isAuthenticated + ' getAuthorities()[0] =' +this.authService.getAuthorities()[0]);
//            console.log("LoginComponent resp userRole = " + authStatus.userRole);
          
//            this.roles = this.authService.getAuthorities();
//            //console.log('LoginComponent isAdmin getAuthorities = ' + this.authService.getAuthorities()[0]);
//            console.log('LoginComponent onSubmit this.roles = ' + this.roles + ' this.roles[0] = ' + this.roles[0]); 
//            //console.log('LoginComponent onSubmit this.roles = ' + this.roles[0]);
//            //this.reloadPage();           
//            this.router.navigate(['/home'])
//            // this.router.navigate([this.returnUrl]);

//            // if (authStatus.isAuthenticated) {
//            //   this.uiService.showToast(`Welcome! Role: ${authStatus.userRole}`)
//            //   this.router.navigate([
//            //     this.redirectUrl || this.homeRoutePerRole(authStatus.userRole),
//            //   ])
//            // }
//          },
//          // error => (this.loginError = error)         
//          error => {
//            ///////console.log('LoginComponent error == '+ error);
//            console.dir(error);            
//            //this.errorMsg = error;           
//            // this.loading = false;
//            console.log('LoginComponent error == '+ error);
//            //console.log('LoginComponent error.status = '+ error.status);
//            //console.log('LoginComponent error.error.message = '+ error.error.message);
//          }
//        );
//  }

  reloadPage() {
    window.location.reload();
  }

  homeRoutePerRole(role: Role) {
    switch (role) {
      case Role.Cashier:
        return '/pos'
      case Role.Clerk:
        return '/inventory'
      case Role.Manager:
        return '/manager'
      default:
        return '/user/profile'
    }
  }
}

/*
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  loading = false;
  returnUrl: string;
  error = '';
  errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('LoginComponent constructor authService.currentAuthStatusValue = ' + authService.currentAuthStatusValue);
    console.log('LoginComponent constructor authService.currentAuthStatusValue.isAuthenticated = ' + authService.currentAuthStatusValue.isAuthenticated);

    // redirect to home if already logged in
    if (this.authService.currentAuthStatusValue.isAuthenticated) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  // onSubmit() {
  async onSubmit() {
    // if (this.form.valid) {
    //   this.authService.login(this.form.value);
    // }
    // this.formSubmitAttempt = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //this.authService.login(this.form.value);
    this.authService.login(this.form.value)
            .pipe(first())
            .subscribe(
                data => {  
                    console.log('LoginComponent onSubmit data = ' + data); 
                    console.dir(data);    
                    // console.log('LoginComponent onSubmit isUserLoggedIn = ' + this.authService.isUserLoggedIn); 

                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    this.errorMsg = error;
                    console.log('LoginComponent error == '+ error);
                });



    // if (this.form.valid) {
    //   this.authService.login(this.form.value);
    // }
    this.formSubmitAttempt = true;


  }
}

*/