import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SheikhsService } from '../../core/services/sheikhs/sheikhs.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-tutor-session',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './tutor-session.component.html',
  styleUrls: ['./tutor-session.component.scss']
})
export class TutorSessionComponent implements OnInit {
  calendlyForm: FormGroup;
  isSubmitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  tutorUsername: string | null = null;

  constructor(
    private fb: FormBuilder,
    private sheikhsService: SheikhsService,
    private authService: AuthService
  ) {
    this.calendlyForm = this.fb.group({
      link: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]]
    });
  }

  ngOnInit(): void {
    this.tutorUsername = this.authService.getCurrentUsername();
    
    if (!this.tutorUsername) {
      this.errorMessage = 'معرف المعلم غير موجود';
    }
  }

  onSubmit(): void {
    if (!this.calendlyForm.valid || !this.tutorUsername) {
      this.calendlyForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = null;
    this.errorMessage = null;

    const link = this.calendlyForm.get('link')?.value;

    this.sheikhsService.addCalendlyLink(this.tutorUsername, link).subscribe({
      next: (response) => {
        console.log('Calendly link added successfully:', response);
        this.successMessage = 'تم حفظ رابط الجلسة بنجاح!';
        this.calendlyForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error adding Calendly link:', error);
        this.errorMessage = 'حدث خطأ أثناء حفظ رابط الجلسة. يرجى المحاولة مرة أخرى.';
        this.isSubmitting = false;
      }
    });
  }

  // Helper method to get form control errors
  getFieldError(fieldName: string): string | null {
    const field = this.calendlyForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return 'هذا الحقل مطلوب';
      }
      if (field.errors['pattern']) {
        return 'يرجى إدخال رابط صحيح يبدأ بـ http أو https';
      }
    }
    return null;
  }
}