import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const BASE_URL = 'http://localhost:3000/api/shak'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  addPost(body): Observable<any> {
    //interpolazione della stringa
    return this.http.post(BASE_URL + "/post/add-post", body);
  }

  getAllPosts(): Observable<any> {
    //interpolazione della stringa
    return this.http.get(BASE_URL + "/posts");
  }
}
