import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../../core/services/student/student.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tutors',
  imports: [FormsModule,RouterLink],
  templateUrl: './tutors.component.html',
  styleUrl: './tutors.component.scss'
})
export class TutorsComponent implements OnInit {
    tutors: any[] = [];
    filteredTutors: any[] = [];
    searchTerm: string = '';


  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadTutors();
  }

  loadTutors(): void {
    this.studentService.getAllTutors().subscribe({
      next: (data) => {
        this.tutors = data;
        // Initialize filtered list for real-time search display
        this.filteredTutors = [...this.tutors];
        console.log('Tutors:', this.tutors);
      },
      error: (err) => {
        console.error('Error fetching tutors', err);
      }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/tutors', id]);
  }

  bookSession(tutorId: string): void {
    this.router.navigate(['/booksession', tutorId]);
  }

  searchTutors(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredTutors = [...this.tutors];
      return;
    }
    this.filteredTutors = this.tutors.filter((tutor) =>
      (tutor.username || '').toLowerCase().includes(term)
    );
  }

}
