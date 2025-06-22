import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FollowService } from '../../services/follow.service';

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

  constructor(private http: HttpClient, private followService: FollowService) {}

  ngOnInit(): void {
    this.loadUsersGrouped();
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
}
