import { Component } from '@angular/core';
import {FormControl, FormGroup,ReactiveFormsModule} from "@angular/forms";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  register :FormGroup = new FormGroup({
    name: new FormControl(null),
    username: new FormControl(null),
    email: new FormControl(null),
    phone: new FormControl(null),
    password: new FormControl(null),
    password_confirmation: new FormControl(null),
    role: new FormControl(null)
  });


  //make the validation here
  submitForm() : void {

  }
}
