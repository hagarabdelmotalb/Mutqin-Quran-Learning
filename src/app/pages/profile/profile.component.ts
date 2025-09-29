import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../core/services/student/student.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  profileData: any; 
  isUpdating = false;
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9+\-\s()]+$/)]]
    });

    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.errorMessage = 'يجب تسجيل الدخول أولاً';
      this.isLoading = false;
      this.router.navigate(['/login']);
      return;
    }
    
    // Get username from auth service (from localStorage)
    const username = this.authService.getCurrentUsername();
    if (!username) {
      this.errorMessage = 'لم يتم العثور على اسم المستخدم';
      this.isLoading = false;
      return;
    }
    
    console.log('Loading profile for username:', username);
    this.studentService.viewProfile(username).subscribe({
      next: (res: any) => {
        console.log('Profile loaded successfully:', res);
        this.profileData = res;
        this.profileForm.patchValue({
          username: res.username,
          name: res.name,
          email: res.email,
          phone: res.phone || ''
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching profile', err);
        this.errorMessage = 'حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isUpdating = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.profileForm.value;
    const updateData = {
      name: formData.name,
      phone: formData.phone
    };

    this.studentService.updateProfile(updateData).subscribe({
      next: (res) => {
        console.log('Profile updated successfully', res);
        this.profileData = res.profile || res;
        
        // Update the auth service with new user data
        if (this.profileData) {
          this.authService.setUserData({
            id: this.profileData.id,
            username: this.profileData.username,
            name: this.profileData.name,
            email: this.profileData.email,
            phone: this.profileData.phone,
            age: this.profileData.age
          });
        }
        
        this.successMessage = res.message || 'تم تحديث البيانات بنجاح';
        this.isUpdating = false;
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Error updating profile', err);
        this.errorMessage = err.error?.message || 'حدث خطأ أثناء التحديث. يرجى المحاولة مرة أخرى.';
        this.isUpdating = false;
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.profileForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'هذا الحقل مطلوب';
      }
      if (control.errors['email']) {
        return 'يرجى إدخال بريد إلكتروني صحيح';
      }
      if (control.errors['minlength']) {
        return 'يجب أن يكون الاسم حرفين على الأقل';
      }
      if (control.errors['pattern']) {
        return 'يرجى إدخال رقم هاتف صحيح';
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.profileForm.get(fieldName);
    return !!(control?.invalid && control.touched);
  }
}
