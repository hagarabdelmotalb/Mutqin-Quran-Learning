import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SheikhsService, StudentInfo } from '../../core/services/sheikhs/sheikhs.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-tutor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.scss']
})
export class TutorDashboardComponent implements OnInit {
  students: StudentInfo[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  tutorUsername: string | null = null;

  constructor(
    private sheikhsService: SheikhsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.tutorUsername = this.authService.getCurrentUsername();
    
    if (!this.tutorUsername) {
      this.errorMessage = 'Tutor username not found';
      return;
    }

    this.loadStudents();
  }

  loadStudents(): void {
    if (!this.tutorUsername) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.sheikhsService.getStudentsByTutorUsername(this.tutorUsername).subscribe({
      next: (students) => {
        this.students = students;
        this.isLoading = false;
        console.log('Students loaded:', students);
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.errorMessage = 'Failed to load students';
        this.isLoading = false;
      }
    });
  }

  refreshStudents(): void {
    this.loadStudents();
  }
}
