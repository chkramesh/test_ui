import { Injectable } from '@angular/core';
import { CacheService } from './cache.service'
import { JwtResponse, Authority } from '../auth/model/jwt-response';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const CURRENTMYAUTHSTATUS_KEY = 'CurrentMyAuthStatus';
const USERROLE_KEY = 'Userrole';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenCacheService {
export abstract class TokenCacheService extends CacheService {
  private roles: Array<string> = [];
  constructor() {
    super();
   }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  // public saveAuthorities(authorities: string[]) {
  //   window.sessionStorage.removeItem(AUTHORITIES_KEY);
  //   window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  // }

  // public getAuthorities(): string[] {
  //   this.roles = [];
  //   if (sessionStorage.getItem(TOKEN_KEY)) {
  //     // console.log('AUTHORITIES_KEY 1 = ' + JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)));
  //     console.log('AUTHORITIES_KEY 2 = ' + sessionStorage.getItem(AUTHORITIES_KEY));

  //     if (JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY))) {
  //       console.log('AUTHORITIES_KEY 3 = ' + sessionStorage.getItem(AUTHORITIES_KEY));
  //       JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
  //         console.log('AUTHORITIES_KEY 3 - 1 authority = ' + authority);
  //         console.log('AUTHORITIES_KEY 3 - 2 authority.authority = ' + authority.authority);
  //         this.roles.push(authority.authority);
  //       });
  //     }
  //   }
  //   return this.roles;
  // }

    public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      // console.log('AUTHORITIES_KEY 1 = ' + JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)));
      // console.log('AUTHORITIES_KEY 2 = ' + sessionStorage.getItem(AUTHORITIES_KEY));

      if (JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY))) {
        // console.log('AUTHORITIES_KEY 3 = ' + sessionStorage.getItem(AUTHORITIES_KEY));
        JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
          // console.log('AUTHORITIES_KEY 3 - 1 authority = ' + authority);
          // console.log('AUTHORITIES_KEY 3 - 2 authority.authority = ' + authority.authority);
          this.roles.push(authority.authority);
        });
      }
    }
    return this.roles;
  }

  public saveAuthorities(authorities: Authority[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  /*
  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      // console.log('AUTHORITIES_KEY 1 = ' + JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)));
      console.log('AUTHORITIES_KEY 2 = ' + sessionStorage.getItem(AUTHORITIES_KEY));

      if (JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY))) {
        // console.log('AUTHORITIES_KEY 3 = ' + sessionStorage.getItem(AUTHORITIES_KEY));
        // console.log('AUTHORITIES_KEY 3 - 0 = ' + JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)));
        //console.log('AUTHORITIES_KEY 3 - 0 - 1 = ' + JSON.stringify(sessionStorage.getItem(AUTHORITIES_KEY)));

        // Object.keys(json).forEach(function(key) {
        //   var value = json[key];
        //   ...
        // });

        //mandatoryFields: any;
        let mandatoryFieldsSrorage = [];
        mandatoryFieldsSrorage= JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY));
        console.log('AUTHORITIES_KEY 3 - 0 - 1 mandatoryFieldsSrorage = ' + mandatoryFieldsSrorage);
        console.log('AUTHORITIES_KEY 3 - 0 - 1 mandatoryFieldsSrorage.length = ' + mandatoryFieldsSrorage.length);
        //console.log('AUTHORITIES_KEY 3 - 0 - 1 ## mandatoryFieldsSrorage.length = ' + JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).length);

        // for (var i = 0; i < JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).length; i++) {  
        //   console.log('AUTHORITIES_KEY 3 - 0 - 1 - 2 mandatoryFieldsSrorage[i] = ' + JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY))[i]);          
        //        // filtered.push(mandatoryFieldsSrorage[i]);
        //        // this.roles.push(mandatoryFieldsSrorage[i]);
        // }

        // var filtered = [];
        // for (var i = 0; i < mandatoryFieldsSrorage.length; i++) {  
        //   console.log('AUTHORITIES_KEY 3 - 0 - 1 - 3 mandatoryFieldsSrorage[i] = ' + mandatoryFieldsSrorage[i]);          
        //         filtered.push(mandatoryFieldsSrorage[i]);
        //         this.roles.push(mandatoryFieldsSrorage[i]);
        // }
       
        //return filtered;
        // console.log('AUTHORITIES_KEY 3 - 0 - 1 filtered = ' + filtered);
        console.log('AUTHORITIES_KEY 3 - 0 - 1 this.roles = ' + this.roles);


        // Object.keys(JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY))).forEach(function(key) {          
        //   console.log('AUTHORITIES_KEY 3 key 1  ================ ' + key);
        //   //var value = JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)[key]);
        //   var value = sessionStorage.getItem(AUTHORITIES_KEY)[key];
        //   console.log('AUTHORITIES_KEY 2 3 value = ' + value);
        //   //his.roles.push(key.authority);          
        // });

        var authoritiesObj = JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY));
        console.log('arr ================== 3  authoritiesObj = ' + authoritiesObj);

        Object.keys(authoritiesObj).forEach(function(elm){
          var arr = authoritiesObj[elm];
          //this.roles.push(arr);
          console.log('arr 4 ==================' + arr); //will print the array belongs to each property.
        });

        // Object.keys(authoritiesObj).forEach(elem => {  
        //   console.log('5 --------------- elm = ' + authoritiesObj[elem]) 
        
        // })



        // // JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        // JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        //   console.log('AUTHORITIES_KEY 3 - 1 authority = ' + authority);
        //   console.log('AUTHORITIES_KEY 3 - 2 authority.authority = ' + authority.authority);
        //   this.roles.push(authority.authority);
        // });
      }
    }
    return this.roles;
  }
  */

  public saveUserRole(userRole: string) {
    window.sessionStorage.removeItem(USERROLE_KEY);
    window.sessionStorage.setItem(USERROLE_KEY, userRole);
  }

  public getUserRole(): string {
    return sessionStorage.getItem(USERROLE_KEY);
  }

  public saveCurrentMyAuthStatus(myAuthStatus: object) {
    this.setSessionStorage(CURRENTMYAUTHSTATUS_KEY, myAuthStatus);    
    // window.sessionStorage.removeItem(CURRENTMYAUTHSTATUS_KEY);
    // window.sessionStorage.setItem(CURRENTMYAUTHSTATUS_KEY, JSON.stringify(myAuthStatus));
  }

  public getCurrentMyAuthStatus<T>(): T {
    return this.getSessionStorageItem(CURRENTMYAUTHSTATUS_KEY);
    // const data = sessionStorage.getItem(CURRENTMYAUTHSTATUS_KEY);
    // if (data && data !== 'undefined') {
    //   return JSON.parse(data)
    // }
    // return null
  }  

}
