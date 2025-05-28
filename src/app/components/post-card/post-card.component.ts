import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PostService],
  templateUrl: './post-card.component.html',
})
export class PostCardComponent implements OnInit {
  postsWithProfiles: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
  this.postService.getPostsWithDetails().subscribe({
    next: (data: any[]) => this.postsWithProfiles = data.slice().reverse(),
    error: (err: any) => console.error('Error fetching posts:', err)
  });
}
}
