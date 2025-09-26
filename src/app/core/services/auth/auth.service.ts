import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  sendRegisterForm(data:object):Observable<any>{
    return this.httpClient.post('https://mutqin-laravel.onrender.com/api/auth/signup', data)
  }
  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post('https://mutqin-laravel.onrender.com/api/auth/login', data)
  }
}
