import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService, StudentSessionDto } from '../../core/services/session/session.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { ProgressService, ProgressTotals } from '../../core/services/progress/progress.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private readonly sessionService = inject(SessionService);
  private readonly authService = inject(AuthService);
  private readonly progressService = inject(ProgressService);
  private readonly ngxSpinnerService= inject(NgxSpinnerService);
  private readonly router = inject(Router);

  sessions: StudentSessionDto[] = [];
  filteredSessions: StudentSessionDto[] = [];
  searchTerm: string = '';
  isLoading = false;
  errorMessage: string | null = null;
  totals: ProgressTotals | null = null;


  ngOnInit(): void {
  this.ngxSpinnerService.show('loading-1');
  const username = this.authService.getCurrentUsername();

  if (!username) {
    this.errorMessage = 'User not logged in';
    return;
  }

  this.isLoading = true;
  this.sessionService.getSessionsByUsername(username).subscribe({
    next: (sessions) => {
      // ✅ Sort sessions by date (newest first)
      this.sessions = sessions.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA; // descending order
      });

      this.filteredSessions = [...this.sessions];
      this.isLoading = false;
    },
    error: () => {
      this.errorMessage = 'Failed to load sessions';
      this.isLoading = false;
    }
  });

  this.progressService.getProgressTotals(username).subscribe({
    next: (totals) => {
      this.totals = totals;
    },
    error: () => {
      // do nothing, keep sessions error if exists
    }
  });

  this.ngxSpinnerService.hide('loading-1');
  }
  searchSessions(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredSessions = [...this.sessions];
      return;
    }
    this.filteredSessions = this.sessions.filter((s) =>
      (s.sheikhUsername || '').toLowerCase().includes(term)
    );
  }

  getSessionStatus(sessionDate: string): 'Upcoming' | 'Passed' | 'Live' {
  const now = new Date().getTime();
  const sessionTime = new Date(sessionDate).getTime();

  // مثال لو عايز تحدد Live لجلسة في نفس اليوم أو الساعة
  const difference = sessionTime - now;

  if (difference > 0) {
    return 'Upcoming';
  } else {
    return 'Passed';
  }
  }
}

