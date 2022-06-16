import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() serviceResponce: any;
  @Output() formData: EventEmitter<any> = new EventEmitter();
  
  formSubmitted: boolean = false;
  invalidCredentials: boolean = false;
  loginForm!: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form();
  }

  form() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get getForm() {
    return this.loginForm.controls;
  }

  submit() {
    this.formSubmitted = true;

    if(!this.loginForm.valid) {
      this.invalidCredentials = false;

      return false;
    } else {
      let submittedForm = this.formData.emit(this.loginForm.value);

      if(this.serviceResponce != 200) this.invalidCredentials = true;
      else this.invalidCredentials = false;

      this.formSubmitted = false;
      this.loginForm.reset();
      
      return submittedForm;
    }
  }
}
