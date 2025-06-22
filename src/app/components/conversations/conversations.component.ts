import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conversations',
  imports: [CommonModule, RouterLink],
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  currentUserId: string = JSON.parse(localStorage.getItem('currentUser') || '{}')?.id;
  chatUsers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAllUsersExceptCurrent();
  }

  loadAllUsersExceptCurrent(): void {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
      this.chatUsers = users.filter(user => user.id !== this.currentUserId);
    });
  }
}
