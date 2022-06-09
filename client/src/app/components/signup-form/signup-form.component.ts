import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  @Input() signUpResponse!: any;//{type: number, msg: string};
  @Output() formData: EventEmitter<any> = new EventEmitter;

  formSubmitted: boolean = false;
  formChecked: boolean = false;
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form();
  }

  form() {
    this.signUpForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get getForm() {
    return this.signUpForm.controls;
  }

  submit() {
    this.formSubmitted = true;

    if(this.signUpForm.valid) {
      this.formData.emit(this.signUpForm.value);
      this.formSubmitted = false;
      this.formChecked = true;

      console.log("adasd");
      console.log(this.signUpResponse);

      this.signUpForm.reset();
    }
  }
}
