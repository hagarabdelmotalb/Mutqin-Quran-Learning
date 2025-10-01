import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookSessionRequest, SessionService } from '../../core/services/session/session.service';
import { UserSearchResponse } from '../../models/profile/profile.module';
import { AuthService } from '../../core/services/auth/auth.service';
import { StudentService } from '../../core/services/student/student.service';

@Component({
  selector: 'app-booksession',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booksession.component.html',
  styleUrls: ['./booksession.component.scss']
})
export class BooksessionComponent implements OnInit {
  bookSessionForm: FormGroup;
  studentId: number | null = null;
  responseMessage: string | null = null;
  calendlyUrl: string | null = null;
  user: UserSearchResponse | null = null;


  constructor(
    private fb: FormBuilder, 
    private bookSessionService: SessionService,
    private authService: AuthService,
    private studentService: StudentService,
    private route: ActivatedRoute)
     {
    this.bookSessionForm = this.fb.group({
      tutorId: ['', Validators.required]
    });
  }

  
  ngOnInit(): void {
    // Get tutor ID from route parameters
    const tutorId = this.route.snapshot.paramMap.get('tutorId');
    if (tutorId) {
      this.bookSessionForm.patchValue({ tutorId: tutorId });
    }

    const currentUser = this.authService.getCurrentUser();
    const emailFromToken = this.authService.getUserEmailFromToken();
    const username = this.authService.getCurrentUsername();

    const identifier = currentUser?.email || emailFromToken || username || '';

    if (!identifier) {
      console.warn('No identifier (email/username) found for current user. Ensure user is logged in.');
      return;
    }

    this.studentService.searchUserByEmailOrUsername(identifier)
      .subscribe({
        next: (data) => {
          this.user = data;
          this.studentId = Number(data.id);
          console.log('Resolved Student ID:', this.studentId);
        },
        error: (err) => {
          console.error('Error fetching user profile for student ID:', err);
        }
      });
  }

  onSubmit() {
    if (this.bookSessionForm.valid) {
      if (this.studentId == null) {
        console.warn('Cannot book session without a studentId');
        return;
      }

      const tutorIdControl = this.bookSessionForm.get('tutorId');
      const tutorIdValue = Number(tutorIdControl?.value);

      const payload: BookSessionRequest = {
        studentId: this.studentId,
        tutorId: tutorIdValue
      };

      this.bookSessionService.bookSession(payload).subscribe({
        next: (res) => {
          this.responseMessage = res.message;
          this.calendlyUrl = res.scheduling_url;
        },
        error: (err) => {
          console.error(err);
          this.responseMessage = 'حدث خطأ أثناء حجز الجلسة';
        }
      });
    }
  }
}
