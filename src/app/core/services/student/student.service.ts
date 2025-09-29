import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface StudentProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateProfileRequest {
  name: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }
  private _Router = inject(Router);
  baseUrl: string = 'https://mutqin-laravel.onrender.com';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  viewProfile(username: string): Observable<StudentProfile> {
    return this.httpClient.get<StudentProfile>(
      `${this.baseUrl}/api/students/profile/${username}`,
      { headers: this.getHeaders() }
    );
  }

  updateProfile(data: UpdateProfileRequest): Observable<{ message: string; profile: StudentProfile }> {
    return this.httpClient.put<{ message: string; profile: StudentProfile }>(
      `${this.baseUrl}/api/students/profile`,
      data,
      { headers: this.getHeaders() }
    );
  }
}
