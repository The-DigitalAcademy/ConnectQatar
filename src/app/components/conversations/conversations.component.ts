import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {FollowService} from '../../services/follow.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-conversations',
  imports: [CommonModule, RouterLink],
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.css'
})
export class ConversationsComponent
implements OnInit {
  currentUserId: string = JSON.parse(localStorage.getItem('currentUser') || '{}')?.id;
  following: any[] = [];

  constructor(private followService: FollowService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFollowingUsers();
  }

  loadFollowingUsers() {
    this.followService.getFollowingEntry(this.currentUserId).subscribe(entry => {
      if (entry?.following?.length) {
        this.http.get<any[]>('http://localhost:3000/users').subscribe(allUsers => {
          this.following = allUsers.filter(user => entry.following.includes(user.id));
        });
      }
    });
  }
}
