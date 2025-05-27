import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-suggested-post-card',
  imports: [CommonModule],
  templateUrl: './suggested-post-card.component.html'
})
export class SuggestedPostCardComponent implements OnInit {
 users: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }
}