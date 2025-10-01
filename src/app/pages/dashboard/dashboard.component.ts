import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  private readonly ngxSpinnerService= inject(NgxSpinnerService)

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
        this.sessions = sessions;
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
        // Do not override sessions error, just set a friendly note if needed
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
}

