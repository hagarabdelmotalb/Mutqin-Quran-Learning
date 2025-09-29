import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

export interface UserData {
  id: number;
  username: string;
  name: string;
  email: string;
  phone?: string;
  age:number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: UserData | null = null;
  private userDataSubject = new BehaviorSubject<UserData | null>(null);
  public userData$ = this.userDataSubject.asObservable();

  constructor(private httpClient: HttpClient) { 
    this.loadUserDataFromStorage();
  }
  
  private _Router = inject(Router);
  baseUrl: string = 'https://mutqin-springboot-backend-1.onrender.com';

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/auth/signup`, data);
  }
  
  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/auth/login`, data);
  }

  saveUserToken(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      console.log('User Token:', token);
    }

    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData) as UserData;
        this.setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('userData');
      }
    }
  }

  setUserData(userData: UserData): void {
    this.userData = userData;
    this.userDataSubject.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getCurrentUser(): UserData | null {
    return this.userData;
  }

  getCurrentUsername(): string | null {
    return this.userData?.username || null;
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  private getJwtPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    try {
      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  }

  getUserEmailFromToken(): string | null {
    const payload = this.getJwtPayload();
    // Spring Security typically uses 'sub' for username/email
    return payload?.sub || null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('userToken');
    return !!token;
  }

  private loadUserDataFromStorage(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        this.userData = JSON.parse(storedUserData);
        this.userDataSubject.next(this.userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('userData');
      }
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    this.userData = null;
    this.userDataSubject.next(null);
    this._Router.navigate(['/login']);
  }
}
