import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnChanges {
  @Input() serviceResponce: any;
  @Output() formData: EventEmitter<any> = new EventEmitter();
  
  formSubmitted: boolean = false;
  invalidCredentials: boolean = false;
  loginForm!: UntypedFormGroup;

  constructor(public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.form();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.serviceResponce = changes['serviceResponce'].currentValue;

    this.setUserMessage();
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

  setUserMessage() {
    if(this.serviceResponce != 200 && this.serviceResponce != undefined) this.invalidCredentials = true;
    else this.invalidCredentials = false;
  }

  submit() {
    this.formSubmitted = true;

    if(!this.loginForm.valid) {
      this.invalidCredentials = false;

      return false;
    } else {
      let submittedForm = this.formData.emit(this.loginForm.value);

      this.setUserMessage();

      this.formSubmitted = false;
      this.loginForm.reset();
      
      return submittedForm;
    }
  }
}
