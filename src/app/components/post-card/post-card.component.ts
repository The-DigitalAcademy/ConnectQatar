import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
})
export class PostCardComponent {
  @Input() postsWithProfiles: any[] = [];
  @Input() post!: any;
  @Input() profile!: any;
  @Input() user!: any;
}