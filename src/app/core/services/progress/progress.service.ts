import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface ProgressUser {
  id: string;
  username: string;
  email: string;
  password: string;
  age: string;
  phone: string;
  memorizationleveltype: string | null;
  points: string;
  googleId: string | null;
  provider: string | null;
  profilePictureUrl: string | null;
  role: string;
}

export interface ProgressEntry {
  id: string;
  user: ProgressUser;
  points: string | null;
  memorizationLevel: string | null;
  newLearnedPages: string | null;
  revisionPages: string | null;
  createdAt: string;
  updatedAt: string;
  sessionsAttended: string | null;
}

export interface ProgressTotals {
  totalPoints: number;
  totalNewLearnedPages: number;
  totalSessionsAttended: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly apiBaseUrl = 'https://mutqin-springboot-backend-1.onrender.com/api';

  constructor(private http: HttpClient) { }

  getProgressByUsername(username: string): Observable<ProgressEntry[]> {
    const url = `${this.apiBaseUrl}/tutor/progress/${encodeURIComponent(username)}`;
    return this.http.get<ProgressEntry[] | ProgressEntry>(url).pipe(
      map((response) => Array.isArray(response) ? response : [response])
    );
  }

  getProgressTotals(username: string): Observable<ProgressTotals> {
    return this.getProgressByUsername(username).pipe(
      map((entries) => {
        let totalPoints = 0;
        let totalNewLearnedPages = 0;
        let totalSessionsAttended = 0;

        for (const entry of entries) {
          totalPoints += this.toNumber(entry.points);
          totalNewLearnedPages += this.toNumber(entry.newLearnedPages);
          totalSessionsAttended += this.toNumber(entry.sessionsAttended);
        }

        return { totalPoints, totalNewLearnedPages, totalSessionsAttended };
      })
    );
  }

  private toNumber(value: string | null | undefined): number {
    if (value === null || value === undefined) {
      return 0;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
}
