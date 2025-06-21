import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed',
  imports: [PostCardComponent, CommonModule, RouterLink],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  postsWithProfiles: any[] = [];
  user: any;
  currentUserId: any = '';

  constructor(private postService: PostService) {}

  handleFollowToggled(event: { userId: string; isFollowed: boolean }) {
    if (!event.isFollowed) {
      // Remove unfollowed user's posts
      console.log('Unfollowing user:', event.userId);
      console.log('Before filter:', this.postsWithProfiles);
      this.postsWithProfiles = this.postsWithProfiles.filter(
        (item) => item.user && item.user.id !== event.userId
      );
      console.log('After filter:', this.postsWithProfiles);
    }
  }

  ngOnInit(): void {
    let currentUser = null;
    try {
      currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    } catch (e) {
      console.error('Failed to parse currentUser from localStorage:', e);
    }
    this.currentUserId = currentUser?.id;
    console.log('Current User:', currentUser);

    if (!this.currentUserId) {
      console.error('No valid currentUserId found. Aborting post fetch.');
      return;
    }

    this.postService
      .getPostsFromFollowedUsers(this.currentUserId)
      .subscribe({
        next: (data) => {
          console.log('Following Posts:', data);
          this.postsWithProfiles = data;
        },
        error: (err) => {
          console.error('Error fetching posts from followed users:', err);
        }
      });
  }
}