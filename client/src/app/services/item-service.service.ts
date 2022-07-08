import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from './user-service.service';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { FileSaverService } from 'ngx-filesaver';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUri: string = 'http://localhost:3435/api/folder';
  headers!: HttpHeaders;
  userToken: string = '';
  currentPath: EventEmitter<any> = new EventEmitter();
  currentPathRef = '';

  public uploader!: FileUploader;

  constructor(private http: HttpClient, private userService: UserService, private toastr: ToastrService, private fileSaver: FileSaverService, private router: Router) {
    this.uploader = new FileUploader({
      itemAlias: 'file'
    });

    this.uploader.onAfterAddingAll = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      this.getContent(this.currentPathRef);
      this.toastr.success('File uploaded');
    }
  }

  setUserAuthToken() {
    let userToken: any = '';
    
    if(undefined !== localStorage.getItem('token') !== null) {
      userToken = localStorage.getItem('token');
    } else {
      this.router.navigate(['login']);
    }

    this.headers = new HttpHeaders().set('content-type', 'apllication/json')
                                    .set('x-access-token', userToken);

    this.userToken = userToken;
  }

  getContent(path?: string) {
    this.setUserAuthToken();

    let queryParams = new HttpParams();
    queryParams = (path) ? queryParams.append("path", path) : queryParams;
    this.currentPathRef = (path) ? path : '/';

    this.http.get(`${this.baseUri}/fetch/`, {headers: this.headers, params: queryParams}).subscribe({
      next: (response) => {
        this.currentPath.emit(response);
      },
      error: (error) => {
        if(error.status == 401) this.userService.logOut();
      }
    });
  }

  newFolder(folderName: string) {
    this.setUserAuthToken();

    const params = new HttpParams()
      .set('folderRefPath', this.currentPathRef)
      .set('folderName', folderName);

    this.http.post<any>(`${this.baseUri}/new`, null, {headers: this.headers, params: params}).subscribe({
      next: (response) => {
        this.toastr.success(`Folder "${folderName}" created`);
      },
      error: (error) => {
        this.toastr.error('Folder creation error');
      }
    });

    this.getContent(this.currentPathRef);
  }

  upload() {
    this.uploader.setOptions({
      url: this.baseUri + '/upload?path=' + this.currentPathRef,
      headers: [{name: 'x-access-token', value: this.userToken}]
    });
    this.uploader.uploadAll();
  }

  delete(item: {name: string, path: string}) {
    this.setUserAuthToken();

    let queryParams = new HttpParams();
    queryParams = queryParams.append('path', item.path);

    this.http.delete(`${this.baseUri}/`, {headers: this.headers, params: queryParams}).subscribe({
      next: (response) => {
        this.toastr.success('Item deleted');
      },
      error: (error) => {
        this.toastr.error('Item delete error');
      }
    });

    this.getContent(this.currentPathRef);
  }

  download(item: {name: string, path: string}) {
    this.setUserAuthToken();

    let queryParams = new HttpParams();
    queryParams = queryParams.append('item', item.path);

    this.http.get(`${this.baseUri}/download/`, {headers: this.headers, params: queryParams, responseType: 'blob'}).subscribe({
      next: (response) => {
        this.fileSaver.save(response, item.name);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
