import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { StudentService } from '../../core/services/student/student.service';
import { finalize } from 'rxjs';  
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly studentService = inject(StudentService);
  private readonly router= inject(Router);

  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  submit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    this.authService
      .sendLoginForm(this.loginForm.value)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
            console.log('Logged in:', res);

            if (res && res.token) {
              localStorage.setItem('userToken', res.token);
              this.authService.saveUserToken();
              
              // Fetch user data after successful login
              this.fetchUserData();
            } else {
              this.errorMessage = 'لم يتم استلام التوكن من الخادم';
            }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = err?.error?.error 
          || err?.error?.messages 
          || 'حدث خطأ أثناء محاولة تسجيل الدخول';
        }
      });
  }

  private fetchUserData(): void {
    // Get email from login form
    const email = this.loginForm.get('email')?.value;
    
    if (email) {
      this.studentService.searchUserByEmailOrUsername(email).subscribe({
        next: (userData) => {
          // Convert UserSearchResponse to UserData format
          const user: any = {
            id: Number(userData.id),
            username: userData.username,
            name: userData.username, // Use username as name if name is not available
            email: userData.email,
            phone: userData.phone,
            age: Number(userData.age)
          };
          
          // Set user data in auth service
          this.authService.setUserData(user);
          
          // Navigate to home after setting user data
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
          // Still navigate to home even if user data fetch fails
          this.router.navigate(['/home']);
        }
      });
    } else {
      // If no email, just navigate to home
      this.router.navigate(['/home']);
    }
  }
}
