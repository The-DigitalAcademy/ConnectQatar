import { Component, OnInit } from '@angular/core';
import { PostTypeComponent } from "../post-type/post-type.component";
import { BottomNavComponent } from "../bottom-nav/bottom-nav.component";
import { CommonModule } from '@angular/common';
import { SuggestedPostCardComponent } from "../suggested-post-card/suggested-post-card.component";
import { PostService } from '../../services/post.service';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-suggested-posts',
  imports: [PostTypeComponent, BottomNavComponent, CommonModule, SuggestedPostCardComponent],
  templateUrl: './suggested-posts.component.html',
})
export class SuggestedPostsComponent implements OnInit {
  usersWithPosts: any[] = [];
  currentFollowing: string[] = [];
  currentUserId: string = '';

  constructor(
    private postService: PostService,
    private followService: FollowService 
  ) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    this.currentUserId = currentUser.id;

    this.refreshCurrentFollowing();

    this.postService.getSuggestedPosts(this.currentUserId).subscribe(data => {
      this.usersWithPosts = data;
    });
  }

  onToggleFollow(targetUserId: string) {
    this.followService.toggleFollow(this.currentUserId, targetUserId).subscribe(() => {
      this.refreshCurrentFollowing();
    });
  }

  refreshCurrentFollowing() {
    this.followService.getFollowingEntry(this.currentUserId).subscribe(entry => {
      this.currentFollowing = entry?.following ?? [];
    });
  }

  trackByUserId(index: number, user: any): string {
    return user.id;
  }
}