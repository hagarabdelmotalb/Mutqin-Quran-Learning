import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService, StudentSessionDto } from '../../core/services/session/session.service';
import { AuthService } from '../../core/services/auth/auth.service';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private readonly sessionService = inject(SessionService);
  private readonly authService = inject(AuthService);

  sessions: StudentSessionDto[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    const username = this.authService.getCurrentUsername();
    if (!username) {
      this.errorMessage = 'User not logged in';
      return;
    }
    this.isLoading = true;
    this.sessionService.getSessionsByUsername(username).subscribe({
      next: (sessions) => {
        this.sessions = sessions;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load sessions';
        this.isLoading = false;
      }
    });
  }
}

