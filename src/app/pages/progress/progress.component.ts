import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progress',
  imports: [CommonModule, FormsModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnInit {

    studentUsername!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.studentUsername = this.route.snapshot.paramMap.get('username')!;
    console.log('Student Username:', this.studentUsername);
  }

  progressData = {
  points: 0,
  numberOfSessionsAttended: 0,
  pagesLearned: 0
};

submitProgress() {
  console.log('Submitting progress for', this.studentUsername, this.progressData);
}

}
