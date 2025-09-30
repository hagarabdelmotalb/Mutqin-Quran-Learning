import { NotificationsService } from './../../core/services/notifications/notifications.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { StudentService } from '../../core/services/student/student.service';
import { NotificationData } from '../../models/progress/progress.module';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  notifications: NotificationData[] = [];
  unreadNotifications: NotificationData[] = [];
  loading = false;
  error: string | null = null;
  currentUserId: string | null = null;
  showUnreadOnly = false;

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.loading = true;
    this.error = null;
    
    // Get current user ID from auth service
    const currentUser = this.authService.getCurrentUser();
    this.currentUserId = currentUser?.id?.toString() || null;
    
    if (!this.currentUserId) {
      // Try to get user ID from token or fetch user data
      this.tryToGetUserId();
      return;
    }

    this.loadNotificationsWithUserId();
  }

  loadUnreadNotifications(): void {
    if (!this.currentUserId) return;
    
    this.loading = true;
    this.error = null;

    this.notificationsService.getUnreadNotifications(this.currentUserId).subscribe({
      next: (data) => {
        this.unreadNotifications = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading unread notifications:', err);
        this.error = 'Failed to load unread notifications';
        this.loading = false;
      }
    });
  }

  markAsRead(notificationId: string): void {
    this.notificationsService.markNotificationAsRead(notificationId).subscribe({
      next: () => {
        // Update local state
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.isRead = true;
        }
        
        // Update unread list
        this.unreadNotifications = this.notifications.filter(n => !n.isRead);
      },
      error: (err) => {
        console.error('Error marking notification as read:', err);
      }
    });
  }

  markAllAsRead(): void {
    const unreadIds = this.unreadNotifications.map(n => n.id);
    unreadIds.forEach(id => this.markAsRead(id));
  }

  toggleUnreadOnly(): void {
    this.showUnreadOnly = !this.showUnreadOnly;
  }

  getDisplayedNotifications(): NotificationData[] {
    return this.showUnreadOnly ? this.unreadNotifications : this.notifications;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  refreshData(): void {
    this.loadNotifications();
  }

  private tryToGetUserId(): void {
    // Try to get email from token
    const emailFromToken = this.authService.getUserEmailFromToken();
    const username = this.authService.getCurrentUsername();
    
    const identifier = emailFromToken || username;
    
    if (!identifier) {
      this.error = 'Unable to get current user information. Please log in again.';
      this.loading = false;
      return;
    }

    // Try to fetch user data using the identifier
    this.studentService.searchUserByEmailOrUsername(identifier).subscribe({
      next: (userData) => {
        this.currentUserId = userData.id;
        
        // Set user data in auth service for future use
        const user: any = {
          id: Number(userData.id),
          username: userData.username,
          name: userData.username,
          email: userData.email,
          phone: userData.phone,
          age: Number(userData.age)
        };
        this.authService.setUserData(user);
        
        // Now load notifications with the user ID
        this.loadNotificationsWithUserId();
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.error = 'Unable to get current user information. Please log in again.';
        this.loading = false;
      }
    });
  }

  private loadNotificationsWithUserId(): void {
    if (!this.currentUserId) {
      this.error = 'Unable to get current user information';
      this.loading = false;
      return;
    }

    this.notificationsService.getAllNotifications(this.currentUserId).subscribe({
      next: (data) => {
        this.notifications = data;
        this.unreadNotifications = data.filter(notification => !notification.isRead);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
        this.error = 'Failed to load notifications';
        this.loading = false;
      }
    });
  }
}
