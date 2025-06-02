import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchAll } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private api = 'http://localhost:3000/messages';
  private usersApi = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  getUserConversations(currentUserId: string): Observable<any[]> {
    return this.getAllMessages().pipe(
      map(messages => {
        const conversationIds = new Set<string>();

        messages.forEach(msg => {
          if (msg.senderId === currentUserId) conversationIds.add(msg.receiverId);
          if (msg.receiverId === currentUserId) conversationIds.add(msg.senderId);
        });

        return Array.from(conversationIds);
      }),
      map(userIds =>
        this.http.get<any[]>(this.usersApi).pipe(
          map(users => users.filter(user => userIds.includes(user.id)))
        )
      ),
      
      switchAll()
    );
  }

  getConversation(currentUserId: string, otherUserId: string): Observable<any[]> {
    return this.getAllMessages().pipe(
      map(messages =>
        messages.filter(msg =>
          (msg.senderId === currentUserId && msg.receiverId === otherUserId) ||
          (msg.senderId === otherUserId && msg.receiverId === currentUserId)
        )
      )
    );
  }

  sendMessage(senderId: string, receiverId: string, content: string): Observable<any> {
    const newMessage = {
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString()
    };
    return this.http.post(this.api, newMessage);
  }
}
