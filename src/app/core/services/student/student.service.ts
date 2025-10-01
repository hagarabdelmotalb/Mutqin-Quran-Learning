import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { StudentRoleProfile, UpdateStudentProfileRequest, UserSearchResponse } from '../../../models/profile/profile.module';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }
  private _Router = inject(Router);
  baseUrl: string = 'https://mutqin-springboot-backend-1.onrender.com';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

   getAllTutors(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/profile/roles?role=TUTOR`);
  }

  viewProfileByIdAndRole(id: string | number, role: string): Observable<StudentRoleProfile> {
    const paramsUrl = `${this.baseUrl}/api/profile/role?id=${id}&role=${encodeURIComponent(role)}`;
    return this.httpClient.get<StudentRoleProfile>(paramsUrl, { headers: this.getHeaders() });
  }

  searchUserByEmailOrUsername(emailOrUsername: string): Observable<UserSearchResponse> {
    const url = `${this.baseUrl}/api/profile/search?emailOrUsername=${encodeURIComponent(emailOrUsername)}`;
    return this.httpClient.get<UserSearchResponse>(url, { headers: this.getHeaders() });
  }

  updateStudentProfile(data: UpdateStudentProfileRequest): Observable<StudentRoleProfile> {
    const body = {
      ...data,
      role: 'STUDENT'
    };

    return this.httpClient.put<StudentRoleProfile>(
      `${this.baseUrl}/api/profile`,
      body,
      { headers: this.getHeaders() }
    );
  }
}
