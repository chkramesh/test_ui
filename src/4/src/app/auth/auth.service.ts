import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { throwError as observableThrowError, of } from 'rxjs'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';
import { AuthLoginInfo } from '../auth/model/login-info';
import { Role } from '../auth/model/role.enum';
import { IAuthStatus } from '../auth/model/IAuthStatus';
import { JwtResponse } from '../auth/model/jwt-response';
import { TokenCacheService } from './token-cache.service'

const httpOptions =  { headers : new HttpHeaders({'Content-type' : 'application/json'})}

const defaultIAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: null,
}

@Injectable()
export class AuthService  extends TokenCacheService {
      private loginInfo: AuthLoginInfo;
    
      public currentAuthStatus : Observable<IAuthStatus>;
      private currentAuthStatusSubject = new BehaviorSubject<IAuthStatus>(defaultIAuthStatus);
     
      constructor(private httpClient: HttpClient, private router: Router) {
        super();
        // this.currentAuthStatusSubject = new BehaviorSubject<IAuthStatus>(JSON.parse(localStorage.getItem('currentMyAuthStatus')) || defaultIAuthStatus);
        this.currentAuthStatusSubject = new BehaviorSubject<IAuthStatus>(JSON.parse(sessionStorage.getItem('currentMyAuthStatus')) || defaultIAuthStatus);
        // this.currentAuthStatusSubject = new BehaviorSubject<IAuthStatus>(this.getCurrentMyAuthStatus() || defaultIAuthStatus);
        
        this.currentAuthStatus = this.currentAuthStatusSubject.asObservable();        
        
        // RC:: for refresh the url
        // if(localStorage.getItem('currentUser') != null)
        //   this.loggedIn.next(true);
      }

      public get currentAuthStatusValue(): IAuthStatus{
        return this.currentAuthStatusSubject.value;
      }
      
      // public login(user: User):Observable<any>{
      // public login(credentials: AuthLoginInfo):Observable<any>{
      public login(credentials: AuthLoginInfo):Observable<any>{
        console.log('AuthService login 2 user = ' + JSON.stringify(credentials));

        //this.loginInfo = new AuthLoginInfo(user.userName, user.password);
        let serviceUrl = 'http://localhost:8080/api/auth/signin';
        let myAuthStatus;

        // return this.httpClient.post<any>(serviceUrl, credentials, httpOptions).pipe(map(data => {
        return this.httpClient.post<any>(serviceUrl, credentials, httpOptions).pipe(map(data => {
          // console.log('AuthService login 3 user == ' + data);
          console.dir(data);
          console.log('AuthService login 4 user.accesstoken == ' + data.accessToken);

          if(data && data.accessToken){        
            console.log("AuthService Login resp authorities = " + data.authorities[0].authority + ' username = ' + data.username);
            console.log("AuthService Login resp email = " + data.userDo.email + ' username = ' + data.userDo.username + ' firstName = ' + data.userDo.firstName);

            this.saveToken(data.accessToken);
            this.saveUsername(data.username);
            this.saveAuthorities(data.authorities);
            this.saveUserRole(data.authorities[0].authority);

            myAuthStatus = this.buildIAuthStatus({
              isAuthenticated: true,
              userRole: data.authorities[0].authority,
              userId: data.userDo.username,
            });

            //localStorage.setItem('currentMyAuthStatus', JSON.stringify(myAuthStatus));
            window.sessionStorage.setItem('currentMyAuthStatus', JSON.stringify(myAuthStatus));
            //this.saveCurrentMyAuthStatus(myAuthStatus);
                        
            this.currentAuthStatusSubject.next(myAuthStatus);

          }else{
            return false;
          }
          //return user;
          return myAuthStatus as IAuthStatus;
        }))
          
      }

      logout() {   
        this.signOut();   
        //localStorage.removeItem('currentMyAuthStatus');
        window.sessionStorage.removeItem('currentMyAuthStatus');
        this.currentAuthStatusSubject.next(defaultIAuthStatus);        
      }

      buildIAuthStatus (authStatus: IAuthStatus) {
        return authStatus;
      }
}
