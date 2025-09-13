import { Component } from '@angular/core';
import {FormControl, FormGroup,ReactiveFormsModule, Validators} from "@angular/forms";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerFrom :FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    username: new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null , [Validators.required ,Validators.email]),
    phone: new FormControl(null,[Validators.pattern(/^[0-9]{8,15}$/)]),
    password: new FormControl(null, [Validators.required,Validators.minLength(6)]),
    password_confirmation: new FormControl(null , [Validators.required]),
    role: new FormControl(null)
  }, 
);

  submitForm() : void {

  }
}
