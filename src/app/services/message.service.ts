import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private api = 'http://localhost:3000/messages';
  private usersApi = 'http://localhost:3000/users';
  private followsApi = 'http://localhost:3000/following';

  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersApi);
  }

  getFollowingEntry(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.followsApi}?userId=${userId}`).pipe(
      map(entries => entries[0])
    );
  }

  getUserConversations(currentUserId: string): Observable<any[]> {
    return forkJoin([
      this.getAllMessages(),
      this.getAllUsers(),
      this.getFollowingEntry(currentUserId)
    ]).pipe(
      map(([messages, users, followEntry]) => {
        const conversationIds = new Set<string>();

        messages.forEach(msg => {
          if (msg.senderId === currentUserId) conversationIds.add(msg.receiverId);
          if (msg.receiverId === currentUserId) conversationIds.add(msg.senderId);
        });

        const followedIds: string[] = followEntry?.following || [];

        const knownContacts = users.filter(user => conversationIds.has(user.id));
        const newChattableUsers = users.filter(user =>
          followedIds.includes(user.id) && !conversationIds.has(user.id)
        );

        return [...knownContacts, ...newChattableUsers];
      })
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
