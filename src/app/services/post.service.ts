import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

// const BASE_URL = 'http://localhost:3000/api/shak'
const BASE_URL = '/api/shak';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  addPost(body): Observable<any> {
    //interpolazione della stringa
    return this.http.post(BASE_URL + "/post/add-post", body);
  }

  removePost(body): Observable<any> {
    return this.http.post(BASE_URL + "/post/remove-post", body);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(BASE_URL + "/posts");
  }

  addLike(body): Observable<any> {
    return this.http.post(BASE_URL + "/post/add-like", body);
  }

  removeLike(body): Observable<any> {
    return this.http.post(BASE_URL + "/post/remove-like", body);
  }

  addComment(postId, comment): Observable<any> {
    return this.http.post(BASE_URL + "/post/add-comment", {
      postId,
      comment
    });
  }

  removeComment(postId, comment): Observable<any> {
    return this.http.post(BASE_URL + "/post/remove-comment", {
      postId,
      comment
    });
  }

  getPost(id): Observable<any>{
    return this.http.get( `${BASE_URL}/post/${id}`);
  }
}
