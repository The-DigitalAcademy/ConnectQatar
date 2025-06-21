import {Component,EventEmitter,Input,Output,OnChanges, SimpleChanges,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FollowButtonComponent } from '../follow-button/follow-button.component';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, RouterLink, FollowButtonComponent],
  templateUrl: './post-card.component.html',
})
export class PostCardComponent implements OnChanges {
  @Input() postsWithProfiles: any[] = [];
  @Input() currentUserId: string = '';
  @Output() followToggled = new EventEmitter<{ userId: string; isFollowed: boolean;}>();

  followStates: { [userId: string]: boolean } = {};
  loadingMap: { [userId: string]: boolean } = {}; 

  constructor(private followService: FollowService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postsWithProfiles'] || changes['currentUserId']) {
      this.updateFollowStates();
    }
  }

  updateFollowStates(): void {
    this.postsWithProfiles.forEach((item) => {
      const userId = item.user?.id;
      if ( userId && userId !== this.currentUserId && this.followStates[userId] === undefined)
         {
        this.followStates[userId] = true;
        this.loadingMap[userId] = false;
      }
    });
  }

  onToggleFollow(userId: string) {
    if (!this.currentUserId || userId === this.currentUserId) return;

    const currentState = this.followStates[userId];
    const newState = !currentState;
    this.followStates[userId] = newState;
    this.loadingMap[userId] = true;

    this.followService.toggleFollow(this.currentUserId, userId).subscribe({
      next: (confirmedFollowState: boolean) => {
        this.followStates[userId] = confirmedFollowState;
        this.followToggled.emit({ userId, isFollowed: confirmedFollowState });
        this.loadingMap[userId] = false;
      },
      error: () => {
        this.followStates[userId] = currentState;
        this.loadingMap[userId] = false;
      },
    });
  }

  isFollowed(userId: string): boolean {
    return this.followStates[userId];
  }

}
