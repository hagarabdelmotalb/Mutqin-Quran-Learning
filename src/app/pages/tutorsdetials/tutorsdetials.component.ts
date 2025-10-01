import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { StudentService } from '../../core/services/student/student.service';

@Component({
  selector: 'app-tutorsdetials',
  imports: [],
  templateUrl: './tutorsdetials.component.html',
  styleUrl: './tutorsdetials.component.scss'
})
export class TutorsdetialsComponent implements OnInit {
  tutor: any;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tutorId = this.route.snapshot.paramMap.get('id');
    if (tutorId) {
      this.studentService.getAllTutors().subscribe({
        next: (data: any[]) => {
          this.tutor = data.find(t => t.id == tutorId);
        },
        error: (err) => console.error('Error fetching tutor details', err)
      });
    }
  }
  goBackToTutors(): void {
    // Prefer explicit navigation to ensure it always goes to tutors list
    this.router.navigate(['/tutors']);
  }

}
