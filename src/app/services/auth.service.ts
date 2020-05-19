import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api/shak'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  registerUser(newUser): Observable<any>{
    return this.http.post(BASE_URL + "/register", newUser);
  }

  loginUser(newUser): Observable<any>{
    return this.http.post(BASE_URL + "/login", newUser);
  }
}
