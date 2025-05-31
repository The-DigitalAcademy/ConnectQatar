import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-feed',
  imports: [PostCardComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  postsWithProfiles: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPostsWithProfiles().subscribe(data => {
      this.postsWithProfiles = data;
    });
  }
}
