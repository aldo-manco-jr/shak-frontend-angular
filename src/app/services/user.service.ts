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

  GetUserById(id): Observable<any>{
    return this.http.get(`${BASE_URL}/user/${id}`);
  }

  GetUserByName(username): Observable<any>{
    return this.http.get(`${BASE_URL}/username/${username}`);
  }

  FollowUser(userFollowed): Observable<any>{
    return this.http.post(`${BASE_URL}/follow-user`, {
      userFollowed
    });
  }

  UnFollowUser(userFollowed): Observable<any>{
    return this.http.post(`${BASE_URL}/unfollow-user`, {
      userFollowed
    });
  }

  MarkNotification (id, deleteValue?): Observable<any> {
    return this.http.post(`${BASE_URL}/mark/${id}`,{
      id,
      deleteValue
    });
  }

  MarkAllAsRead(): Observable<any> {
    return this.http.post(`${BASE_URL}/mark-all`,{
      all:true
    });
  }

  // async GetAllUsers(){
  //   return await this.http.get(BASE_URL + '/users');
  // }
}
