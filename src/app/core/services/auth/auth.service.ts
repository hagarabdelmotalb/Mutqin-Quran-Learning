import { jwtDecode, JwtDecodeOptions } from './../../../../../node_modules/jwt-decode/build/cjs/index.d';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any = null;

  constructor(private httpClient:HttpClient) { }
  baseUrl:string='https://mutqin-laravel.onrender.com';

  sendRegisterForm(data:object):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/api/auth/signup`, data)
  }
  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/api/auth/login`, data)
  }


  saveUserToken(): void {
  const token = localStorage.getItem('userToken');
  if (token) {
    console.log('User Token:', token);
  }

  const userData = localStorage.getItem('userData');
  if (userData) {
    console.log('User Data:', JSON.parse(userData));
   }
  }
}
