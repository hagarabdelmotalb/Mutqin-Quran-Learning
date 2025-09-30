import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../core/services/student/student.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  private route = inject(ActivatedRoute);

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router
  ) {}

ngOnInit(): void {
  this.profileForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    age: ['', [Validators.required]],
    phone: ['', [Validators.pattern(/^[0-9+\-\s()]+$/)]],
    email: [{ value: '', disabled: true }]
  });

  this.loadProfile();
}

reloadProfile(): void {
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
    
    // Prefer query params id & role if provided, else fallback to current user
    const idParam = this.route.snapshot.queryParamMap.get('id');
    const roleParam = this.route.snapshot.queryParamMap.get('role');

    if (idParam && roleParam) {
      console.log('Loading profile by id/role:', idParam, roleParam);
      this.studentService.viewProfileByIdAndRole(idParam, roleParam).subscribe({
        next: (res) => {
          console.log('Profile loaded successfully (id/role):', res);
          this.profileData = res;
          this.profileForm.patchValue({
          username: res.username,
          name: res.username,
          email: res.email,
          phone: res.phone || '',
          age: res.age || ''
        });
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching profile by id/role', err);
          this.errorMessage = 'حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.';
          this.isLoading = false;
        }
      });
    } else {
      // Try to find user id first using emailOrUsername query param
      const emailOrUsername = this.route.snapshot.queryParamMap.get('emailOrUsername');
      if (emailOrUsername) {
        console.log('Searching user by emailOrUsername:', emailOrUsername);
        this.studentService.searchUserByEmailOrUsername(emailOrUsername).subscribe({
          next: (user) => {
            const derivedRole = user.role || 'STUDENT';
            console.log('User found. Fetching profile by id/role:', user.id, derivedRole);
            this.studentService.viewProfileByIdAndRole(user.id, derivedRole).subscribe({
              next: (res) => {
                this.profileData = res;
                this.profileForm.patchValue({
                  username: res.username,
                  name: res.username,
                  email: res.email,
                  phone: res.phone || ''
                });
                this.isLoading = false;
              },
              error: (err) => {
                console.error('Error fetching profile by id/role (from search)', err);
                this.errorMessage = 'حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.';
                this.isLoading = false;
              }
            });
          },
          error: (err) => {
            console.error('Error searching user by emailOrUsername', err);
            this.loadByUsernameFallback();
          }
        });
        return;
      }

      // Fallback: derive identity (prefer token email), then search → load by id/role
      this.loadByUsernameFallback();
    }
  }

getRoleName(role: string | null | undefined): string {
  switch (role) {
    case 'STUDENT': return 'طالب';
    case 'TUTOR': return 'معلم';
    case 'PARENT': return 'ولي أمر';
    default: return role || 'غير محدد';
  }
}

getMemorizationLevel(level: string | null | undefined): string {
  switch (level) {
    case 'BEGINNER': return 'مبتدئ';
    case 'INTERMEDIATE': return 'متوسط';
    case 'ADVANCED': return 'متقدم';
    case 'HAFIZ': return 'حافظ';
    default: return 'غير محدد';
  }
}

  private loadByUsernameFallback(): void {
    const tokenEmail = this.authService.getUserEmailFromToken();
    const emailOrUsername = tokenEmail || this.profileForm.get('username')?.value || this.profileForm.get('email')?.value;
    if (!emailOrUsername) {
      this.errorMessage = 'لا توجد معلومات كافية لتحديد هوية المستخدم.';
      this.isLoading = false;
      return;
    }
    console.log('Searching user by identifier (fallback):', emailOrUsername);
    this.studentService.searchUserByEmailOrUsername(emailOrUsername).subscribe({
      next: (user) => {
        const derivedRole = user.role || 'STUDENT';
        this.studentService.viewProfileByIdAndRole(user.id, derivedRole).subscribe({
          next: (res) => {
            this.profileData = res;
            this.profileForm.patchValue({
              username: res.username,
              age: res.age,
              phone: res.phone || '',
              email: res.email
            });
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error fetching profile by id/role (fallback)', err);
            this.errorMessage = 'حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.';
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error searching user (fallback)', err);
        this.errorMessage = 'تعذر العثور على المستخدم.';
        this.isLoading = false;
      }
    });
  }

  
onSubmit(): void {
  this.markFormGroupTouched();
  this.errorMessage = '';
  this.successMessage = '';

  if (this.profileForm.invalid) {
    this.errorMessage = 'يرجى تصحيح الأخطاء في النموذج.';
    return;
  }

  // نجهز البيانات اللي هنبعتها
  const updatedData = {
    username: this.profileForm.value.username,
    age: this.profileForm.get('age')?.value,
    phone: this.profileForm.get('phone')?.value
  };

  this.isUpdating = true;

  this.studentService.updateStudentProfile(updatedData).subscribe({
    next: (res) => {
      console.log('Profile updated successfully:', res);
      this.successMessage = 'تم تحديث الملف الشخصي بنجاح';
      this.profileData = res;
      this.isUpdating = false;
    },
    error: (err) => {
      console.error('Error updating profile:', err);
      this.errorMessage = 'حدث خطأ أثناء تحديث البيانات. حاول مرة أخرى لاحقًا.';
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
