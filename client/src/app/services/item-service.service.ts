import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUri: string = 'http://localhost:3435/api/folder';
  headers!: HttpHeaders;
  currentPath: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private userService: UserService) {
    let userToken: any = '';
    
    if(undefined !== localStorage.getItem('token') !== null) {
      userToken = localStorage.getItem('token');
    }

    this.headers = new HttpHeaders().set('content-type', 'apllication/json')
                                    .set('x-access-token', userToken);
  }

  getContent(path?: string) {
    let queryParams = new HttpParams();
    queryParams = (path) ? queryParams.append("path", path) : queryParams;

    this.http.get(`${this.baseUri}`, {headers: this.headers, params: queryParams}).subscribe({
      next: (response) => {
        this.currentPath.emit(response);
      },
      error: (error) => {
        if(error.status == 401) this.userService.logOut();
      }
    });
  }
}
