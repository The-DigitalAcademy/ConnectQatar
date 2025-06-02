import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed',
  imports: [PostCardComponent, CommonModule,RouterLink],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  postsWithProfiles: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  console.log('Current User:', currentUser);

  this.postService.getPostsFromFollowedUsers(currentUser.id).subscribe(data => {
    console.log('Following Posts:', data);
    this.postsWithProfiles = data;
  });
}
}