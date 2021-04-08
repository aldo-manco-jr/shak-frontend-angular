import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://ec2-15-237-74-79.eu-west-3.compute.amazonaws.com/api/shak'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  /*
    I metodi (registerUser()) e (loginUser())
    che restituiscono un Observable,
    dopo che i dati inseriti (newUser) vengono elaborati dal server,
    notifica del completamento dell'operazione,
    tutti gli Observer ad esso iscritti
   */

  registerUser(newUser): Observable<any>{
    return this.http.post(BASE_URL + "/register", newUser);
  }

  loginUser(newUser): Observable<any>{
    return this.http.post(BASE_URL + "/login", newUser);
  }
}
