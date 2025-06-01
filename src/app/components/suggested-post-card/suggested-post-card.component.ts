import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggested-post-card',
  imports: [CommonModule],
  templateUrl: './suggested-post-card.component.html',
})
export class SuggestedPostCardComponent {
  @Input() user: any;
  @Input() isFollowed: boolean = false;
  @Output() toggleFollow = new EventEmitter<string>();

  onToggleFollow() {
    this.toggleFollow.emit(this.user.id);
  }
}