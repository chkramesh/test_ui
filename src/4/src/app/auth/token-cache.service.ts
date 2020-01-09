import { Injectable } from '@angular/core';
import { CacheService } from './cache.service'

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

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      // console.log('AUTHORITIES_KEY 1 = ' + JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)));
      // console.log('AUTHORITIES_KEY 2 = ' + sessionStorage.getItem(AUTHORITIES_KEY));

      if (JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY))) {
        // console.log('AUTHORITIES_KEY 3 = ' + sessionStorage.getItem(AUTHORITIES_KEY));
        JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
          this.roles.push(authority.authority);
        });
      }
    }
    return this.roles;
  }

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
