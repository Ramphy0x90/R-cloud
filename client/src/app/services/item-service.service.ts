import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUri: string = 'http://localhost:3435/api/folder';
  headers!: HttpHeaders;
  currentPath: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
    let userToken: any = '';
    
    if(undefined !== localStorage.getItem('token') !== null) {
      userToken = localStorage.getItem('token');
    }

    this.headers = new HttpHeaders().set('content-type', 'apllication/json')
                                    .set('x-access-token', userToken);
  }

  getContent(path: string = '') {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("path", path);

    this.http.get(`${this.baseUri}`, {headers: this.headers, params: queryParams}).subscribe({
      next: (response) => {
        this.currentPath.emit(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
