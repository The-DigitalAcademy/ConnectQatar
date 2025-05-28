import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

interface Post {
  id: string;
  title: string;
  image: string;
  userId: string;
}

interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  profileImage: string;
}

@Component({
  selector: 'app-suggested-post-card',
  imports: [CommonModule],
  templateUrl: './suggested-post-card.component.html'
})

export class SuggestedPostCardComponent implements OnInit {
  users: User[] = [];
  posts: Post[] = [];
  usersWithPosts: Array<User & { posts: Post[] }> = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
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
