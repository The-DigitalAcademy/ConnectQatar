import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FollowService } from '../../services/follow.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-conversations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  currentUserId: string = JSON.parse(localStorage.getItem('currentUser') || '{}')?.id;
  followedUsers: any[] = [];
  otherUsers: any[] = [];
  newMessagesFromUsers: any[] = [];

  constructor(
    private http: HttpClient,
    private followService: FollowService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUsersGrouped();
    this.loadRecentMessages();
  }

  loadUsersGrouped(): void {
    this.followService.getFollowingEntry(this.currentUserId).subscribe(entry => {
      const followingIds = entry?.following || [];

      this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
        const others: any[] = [];
        const followed: any[] = [];

        users.forEach(user => {
          if (user.id === this.currentUserId) return;

          if (followingIds.includes(user.id)) {
            followed.push(user);
          } else {
            others.push(user);
          }
        });

        this.followedUsers = followed;
        this.otherUsers = others;
      });
    });
  }

  loadRecentMessages(): void {
    this.messageService.getAllMessages().subscribe(messages => {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const recentSenders = new Set(
        messages
          .filter(msg =>
            msg.receiverId === this.currentUserId &&
            new Date(msg.timestamp) > oneDayAgo
          )
          .map(msg => msg.senderId)
      );

      if (recentSenders.size === 0) return;

      this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
        this.newMessagesFromUsers = users.filter(user => recentSenders.has(user.id));
      });
    });
  }
}

