import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://75.119.138.163:8888/api/shak'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  SendMessage(senderId, receiverId, receiverName, message): Observable<any>{
    return this.http.post(`${BASE_URL}/chat-messages/${senderId}/${receiverId}`, {
      receiverId,
      receiverName,
      message
    });
  }

  GetAllMessages(senderId, receiverId): Observable<any> {
    return this.http.get(`${BASE_URL}/chat-messages/${senderId}/${receiverId}`);
  }

  MarkReceiverMessages(sender,receiver): Observable<any>{
    return this.http.get(`${BASE_URL}/receiver-messages/${sender}/${receiver}`);
  }

  MarkAllMessages(): Observable<any>{
    return this.http.get(`${BASE_URL}/mark-all-messages/`);
  }
}
