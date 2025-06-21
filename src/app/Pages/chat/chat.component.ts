import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConversationsComponent } from '../../components/conversations/conversations.component';

@Component({
  selector: 'app-chat',
  imports: [RouterLink, ConversationsComponent],
  templateUrl: './chat.component.html',
  styles: ``
})
export class ChatComponent {

}
