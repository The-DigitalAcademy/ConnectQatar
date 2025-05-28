import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggested-post-card',
  imports: [CommonModule],
  templateUrl: './suggested-post-card.component.html'
})
export class SuggestedPostCardComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  usersWithPosts: any[] = [];
user: any;

  constructor(private postService: PostService) {}

  ngOnInit() {
    // all users and posts
    Promise.all([
      this.postService.getAllUsers().toPromise(),
      this.postService.getPostsWithDetails().toPromise()
    ]).then(([users, postsWithDetails]) => {
     
      const posts = postsWithDetails?.map((item: any) => item.post);

      this.users = users || [];
      this.posts = posts || [];

      this.usersWithPosts = this.users.map(user => ({
        ...user,
        posts: this.posts.filter(post => String(post.userId) === String(user.id))
      }));
    });
  }
}