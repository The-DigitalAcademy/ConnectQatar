import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-conversations',
  imports: [CommonModule, RouterLink],
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.css'
})
export class ConversationsComponent implements OnInit {
  currentUserId = JSON.parse(localStorage.getItem('currentUser') || '{}')?.id;
  users: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getUserConversations(this.currentUserId).subscribe(users => {
      this.users = users;
    });
  }
}

