import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProgressService, ProgressEntry, ProgressTotals } from '../../core/services/progress/progress.service'

@Component({
  selector: 'app-student-progress',
  imports: [CommonModule],
  templateUrl: './student-progress.component.html',
  styleUrl: './student-progress.component.scss'
})
export class StudentProgressComponent implements OnInit {
  username: string = '';
  progressEntries: ProgressEntry[] = [];
  totals: ProgressTotals | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') || '';

    if (this.username) {
      this.loadProgressData();
    } else {
      this.errorMessage = 'لم يتم العثور على اسم المستخدم في الرابط.';
    }
  }

  loadProgressData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.progressService.getProgressByUsername(this.username).subscribe({
      next: (entries) => {
        this.progressEntries = entries;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading progress:', error);
        this.errorMessage = 'حدث خطأ أثناء جلب بيانات التقدم.';
        this.isLoading = false;
      }
    });

    this.progressService.getProgressTotals(this.username).subscribe({
      next: (totals) => {
        this.totals = totals;
      },
      error: (error) => {
        console.error('Error loading totals:', error);
      }
    });
  }
}
