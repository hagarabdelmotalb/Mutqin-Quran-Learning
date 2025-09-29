import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup,ReactiveFormsModule, Validators} from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private readonly authService= inject(AuthService);
  private readonly router= inject(Router);

  isSubmitting: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  registerFrom :FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    username: new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null , [Validators.required ,Validators.email]),
    phone: new FormControl(null,[Validators.pattern(/^\+?[0-9]{8,15}$/)]),
    age:new FormControl(null,[Validators.required]),
    password: new FormControl(null, [Validators.required,Validators.minLength(6)]),
    password_confirmation: new FormControl(null , [Validators.required]),
    role: new FormControl(null, [Validators.required]),
  },  {validators: this.confirmPassword}
);


  confirmPassword(group: AbstractControl) {
  const password = group.get('password');
  const confirmPassword = group.get('password_confirmation');

  if (password && confirmPassword) {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      
      if (confirmPassword.errors) {
        delete confirmPassword.errors['mismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
    }
  }
  return null;
  }
  

  submitForm() : void {
    if (!this.registerFrom.valid) {
      this.registerFrom.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.authService
      .sendRegisterForm(this.registerFrom.value)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log('Success:', res);
          if(res.message === 'User registered successfully'){
            this.successMessage = 'تم إنشاء الحساب بنجاح';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }
          
        },
        error: (err) => {
          this.errorMessage = err?.error?.error || err?.error?.message || 'حدث خطأ أثناء إنشاء الحساب';
          console.error('Error:', err);
        }
      });
  }
}
