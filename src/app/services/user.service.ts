import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

const BASE_URL = 'http://75.119.138.163:8888/api/shak'

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
      userFollowed: userFollowed
    });
  }

  UnFollowUser(userFollowed): Observable<any>{
    return this.http.post(`${BASE_URL}/unfollow-user`, {
      userFollowed: userFollowed
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
  AddImage(image): Observable<any> {
    return this.http.post(`${BASE_URL}/upload-image`, {
      image: image
    });
  }
  SetDefaultImage(imageId,imageVersion): Observable<any>{
    return this.http.get(`${BASE_URL}/set-default-image/${imageId}/${imageVersion}`);

    //alternative
    //return this.http.get(`${BASE_URL}/set-default-image?id=${imageId}?version${imageVersion}`);
  }

  ProfileNotifications(id): Observable<any> {
    return this.http.post(`${BASE_URL}/user/view-profile`,{id});
  }

  ChangePassword(body): Observable<any> {
    return this.http.post(`${BASE_URL}/change-password`, body);
  }


}
