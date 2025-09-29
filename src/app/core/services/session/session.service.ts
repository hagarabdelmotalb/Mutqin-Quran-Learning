import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSearchResponse } from '../../../models/profile/profile.module';


export interface BookSessionRequest {
  studentId: number;
  tutorId: number;
}


export interface BookSessionResponse {
  scheduling_url: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService  {

  baseUrl = 'https://mutqin-springboot-backend-1.onrender.com';


  constructor(private httpClient: HttpClient) {}

  getUserByEmailOrUsername(emailOrUsername: string, emailHeader?: string): Observable<UserSearchResponse> {
    const url = `${this.baseUrl}/search?emailOrUsername=${encodeURIComponent(emailOrUsername)}`;

    let headers = new HttpHeaders();
    if (emailHeader) {
      headers = headers.set('email', emailHeader);
    }

    return this.httpClient.get<UserSearchResponse>(url, { headers });
  }

  bookSession(data: BookSessionRequest): Observable<BookSessionResponse> {
    return this.httpClient.post<BookSessionResponse>(
      `${this.baseUrl}/students/sessions/book`,
      data
    );
  }

}
