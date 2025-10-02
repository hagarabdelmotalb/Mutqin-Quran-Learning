import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface StudentInfo {
  id: string;
  username: string;
  email: string;
  age: string;
  points: string;
  profilePictureUrl: string | null;
  phone: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class SheikhsService {
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

  getStudentsByTutorUsername(tutorUsername: string): Observable<StudentInfo[]> {
    const url = `${this.baseUrl}/api/tutor/progress/sheikhs/${encodeURIComponent(tutorUsername)}/students`;
    return this.httpClient.get<StudentInfo[]>(url, { headers: this.getHeaders() });
  }

  addCalendlyLink(tutorUsername: string, link: string): Observable<any> {
     const url = `${this.baseUrl}/api/tutor/progress/event-type-link/${encodeURIComponent(tutorUsername)}`;
     const body = { link };
     return this.httpClient.post(url, body, { headers: this.getHeaders() });
   }

addProgress(studentUsername: string, progressData: any) {
  const url = `${this.baseUrl}/api/tutor/progress/${encodeURIComponent(studentUsername)}`;
  return this.httpClient.post(url, progressData, { headers: this.getHeaders() });
}
}
