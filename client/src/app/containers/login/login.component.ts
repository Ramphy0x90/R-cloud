import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  serviceResponse: any;

  constructor(private userService: UserService) {
    this.userService.userApiResponse.subscribe((response) => {
      this.serviceResponse = response;
    });
  }

  ngOnInit(): void {
  }

  loginFormData(data: any) {
    this.userService.login(data);
  }
}
