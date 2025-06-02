import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-messaging',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.css'
})
export class MessagingPageComponent implements OnInit {
  currentUserId: string = JSON.parse(localStorage.getItem('currentUser') || '{}')?.id;
  recipientId!: string;
  recipient: any;
  messages: any[] = [];
  newMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.recipientId = params.get('userId')!;
      if (this.recipientId) {
        this.loadRecipient();
        this.loadMessages();
      }
    });
  }

  loadRecipient() {
    this.http.get<any[]>(`http://localhost:3000/users?id=${this.recipientId}`).subscribe(data => {
      this.recipient = data[0];
    });
  }

  loadMessages() {
    this.messageService.getConversation(this.currentUserId, this.recipientId).subscribe(data => {
      this.messages = data;
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.messageService.sendMessage(this.currentUserId, this.recipientId, this.newMessage).subscribe(() => {
      this.newMessage = '';
      this.loadMessages();
    });
  }
}