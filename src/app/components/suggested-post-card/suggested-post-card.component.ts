import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

interface Profile {
  id: string;
  name: string;
  image: string;
  userId: string;
}

interface Post {
  id: string;
  title: string;
  image: string;
  profileId: string;
}

@Component({
  selector: 'app-suggested-post-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './suggested-post-card.component.html',
})
export class SuggestedPostCardComponent implements OnInit {
  usersWithPosts: Array<Profile & { posts: Post[] }> = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    forkJoin({
      profiles: this.http.get<Profile[]>('http://localhost:3000/profile'),
      posts: this.http.get<Post[]>('http://localhost:3000/posts'),
    }).subscribe({
      next: ({ profiles, posts }) => {
        this.usersWithPosts = profiles.map(profile => ({
          ...profile,
          posts: posts.filter(p => p.profileId === profile.id),
        }));
        console.log('Users with posts:', this.usersWithPosts);
      },
      error: err => {
        console.error('Error fetching data', err);
      }
    });
  }

  trackByUserId = (_: number, item: Profile & { posts: Post[] }) => item.id;
}
