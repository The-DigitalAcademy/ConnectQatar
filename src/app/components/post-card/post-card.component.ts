import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './post-card.component.html',
})
export class PostCardComponent {
  @Input() postsWithProfiles: any[] = [];
  @Input() post!: any;
  @Input() profile!: any;
  @Input() user: any;

  @Input() isFollowed: boolean = true;
  @Output() toggleFollow = new EventEmitter<string>();

  onToggleFollow() {
    this.toggleFollow.emit();
  }

  protected readonly console = console;
}
