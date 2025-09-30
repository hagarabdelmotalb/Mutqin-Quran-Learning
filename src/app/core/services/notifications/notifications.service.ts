import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '.././auth/auth.service';
import { NotificationData } from '../../../models/progress/progress.module';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private baseUrl = 'https://mutqin-springboot-backend-1.onrender.com';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllNotifications(userId: string): Observable<NotificationData[]> {
    const url = `${this.baseUrl}/api/notifications/${userId}`;
    return this.httpClient.get<NotificationData[]>(url, { headers: this.getHeaders() });
  }

  getUnreadNotifications(userId: string): Observable<NotificationData[]> {
    const url = `${this.baseUrl}/api/notifications/unread/${userId}`;
    return this.httpClient.get<NotificationData[]>(url, { headers: this.getHeaders() });
  }

  markNotificationAsRead(notificationId: string): Observable<any> {
    const url = `${this.baseUrl}/api/notifications/${notificationId}/read`;
    return this.httpClient.put(url, {}, { headers: this.getHeaders() });
  }
}
