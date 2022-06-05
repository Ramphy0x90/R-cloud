import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUri: String = 'http://localhost:3435/api/user';
  headers: HttpHeaders = new HttpHeaders().set('content-type', 'application/json');

  constructor(private http: HttpClient, private router: Router) { }

  login(userData: any) {
    this.http.post<{ accessToken: string; id: string, userName: String }>(`${this.baseUri}/login`, userData)
    .subscribe({
      next: (response) => {
        this.saveLoggedUser(response.accessToken, response.id, response.userName);
        this.router.navigate(['app']);
        localStorage.removeItem('loginError');
      },
      error: (error: HttpErrorResponse) => {
        localStorage.setItem('loginError', error.error.msg);
      }
    });
  }

  signup(userData: any) {
    return this.http.post(`${this.baseUri}/register`, userData);
  }

  saveLoggedUser(token: String, id: String, userName: String) {
    localStorage.setItem('token', token.toString());
    localStorage.setItem('id', id.toString());
    localStorage.setItem('userName', userName.toString());
  }
}
