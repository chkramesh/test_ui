import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
// clsimport { of } from 'rxjs/observable/of';
// import { of } from 'rxjs/operators';
import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';

import { User } from './user';

const USERS = [
  new User(1, 'mahesh', 'm123', 'ADMIN'),
  new User(2, 'krishna', 'k123', 'ADMIN'),
  new User(2, 'test', 'test', 'ADMIN')
];
let usersObservable = Observable.of(USERS);

@Injectable()
export class AuthService { 
    private redirectUrl: string = '/';
	private loginUrl: string = '/login';
	private isloggedIn: boolean = false;
	private loggedInUser: User;
	getAllUsers(): Observable<User[]> {
	    return usersObservable;
	}
		
	isUserAuthenticated(username: string, password:string): Observable<boolean> {
		return this.getAllUsers()
			.pipe(map(users => {
				let user = 	users.find(user => (user.username === username) && (user.password === password));
                if(user) {
					this.isloggedIn = true;
					this.loggedInUser = user;
				} else {
					this.isloggedIn = false;
				}
				return this.isloggedIn; 	
			}));
	}	
	
	isUserLoggedIn(): boolean {
		return this.isloggedIn;
	}
	getRedirectUrl(): string {
		return this.redirectUrl;
	}
	setRedirectUrl(url: string): void {
		this.redirectUrl = url;
	}
	getLoginUrl(): string {
		return this.loginUrl;
	}
	getLoggedInUser(): User {
		return this.loggedInUser;
	}
	logoutUser(): void{
		this.isloggedIn = false;
	}
}