import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUri: String = 'http://localhost:3435/api/user';
  headers: HttpHeaders = new HttpHeaders().set('content-type', 'application/json');
  userStatus: EventEmitter<boolean> = new EventEmitter;
  userSignUp: EventEmitter<number> = new EventEmitter;

  constructor(private http: HttpClient, private router: Router) {
    this.autoLogin();
  }

  autoLogin() {
    if(localStorage.getItem('token')) this.userStatus.emit(true);
  }

  login(userData: any) {
    this.http.post<{ accessToken: string; id: string, userName: String }>(`${this.baseUri}/login`, userData)
    .subscribe({
      next: (response) => {
        this.saveLoggedUser(response.accessToken, response.id, response.userName);
        this.router.navigate(['app']);
        this.userStatus.emit(true);

        localStorage.removeItem('loginError');
      },
      error: (error: HttpErrorResponse) => {
        localStorage.setItem('loginError', error.error.msg);
      }
    });
  }

  signup(userData: any) {
    this.http.post<{status: number}>(`${this.baseUri}/register`, userData)
    .subscribe({
      next: () => {
        this.userSignUp.emit(201);
      },
      error: (error) => {
        this.userSignUp.emit(error.status);
      }
    });
  }

  logOut() {
    this.userStatus.emit(false);
    localStorage.clear();
    this.router.navigate(['home']);
  }

  getUserSTatus() {
    return this.userStatus;
  }

  saveLoggedUser(token: String, id: String, userName: String) {
    localStorage.setItem('token', token.toString());
    localStorage.setItem('id', id.toString());
    localStorage.setItem('userName', userName.toString());
  }
}
