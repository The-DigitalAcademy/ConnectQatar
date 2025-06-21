
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-follow-button',
  imports: [CommonModule],
  templateUrl: './follow-button.component.html',
})
export class FollowButtonComponent {
  @Input() isFollowed: boolean = false;
  @Output() toggleFollow = new EventEmitter<void>();

  onToggleFollow() {
    this.toggleFollow.emit();
  }
}