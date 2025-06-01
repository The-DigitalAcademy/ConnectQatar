import { Component, OnInit } from '@angular/core';
import { PostTypeComponent } from "../post-type/post-type.component";
import { BottomNavComponent } from "../bottom-nav/bottom-nav.component";
import { CommonModule } from '@angular/common';
import { SuggestedPostCardComponent } from "../suggested-post-card/suggested-post-card.component";
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-suggested-posts',
  imports: [PostTypeComponent, BottomNavComponent, CommonModule, SuggestedPostCardComponent],
  templateUrl: './suggested-posts.component.html',
})
export class SuggestedPostsComponent implements OnInit {
  usersWithPosts: any[] = [];
  currentFollowing: string[] = [];
  currentUserId: string = '';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    this.currentUserId = currentUser.id;

    this.postService.getSuggestedPosts(this.currentUserId).subscribe(data => {
      this.usersWithPosts = data;
    });

    this.postService.getPostsFromFollowedUsers(this.currentUserId).subscribe(following => {
      this.currentFollowing = following;
    });
  }

  onToggleFollow(userId: string): void {
    if (this.currentFollowing.includes(userId)) {
      this.currentFollowing = this.currentFollowing.filter(id => id !== userId);
    } else {
      this.currentFollowing.push(userId);
    }
  }

  trackByUserId(index: number, user: any): string {
    return user.id;
  }
}

