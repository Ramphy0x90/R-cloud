import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpResponse: {type: number, msg: string} = {type: 0, msg: ''};

  constructor(private userService: UserService) {
    this.userService.userSignUp.subscribe((status) => {
      this.setSignUpResponse(status);
    })
  }

  ngOnInit(): void {
  }

  signUpFormData(data: any) {
    this.userService.signup(data);
  }

  setSignUpResponse(type: number) {
    this.signUpResponse.type = type;

    if(type == 201) {
      this.signUpResponse.msg = 'User created';
    } else if(type == 409) {
      this.signUpResponse.msg = 'User already exists';
    }
  }
}
