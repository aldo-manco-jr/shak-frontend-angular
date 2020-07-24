import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api/shak';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  GetAllUsers(): Observable<any>{
    return this.http.get(BASE_URL + '/users');
  }

  // async GetAllUsers(){
  //   return await this.http.get(BASE_URL + '/users');
  // }
}
