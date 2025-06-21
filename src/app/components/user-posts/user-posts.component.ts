import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-posts',
  imports: [CommonModule],
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  userId: string = '';
  userPosts: any[] = [];
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ngOnInit() {
  const storedUser = localStorage.getItem('currentUser');
  if (!storedUser) {
    console.warn('No currentUser found in localStorage.');
    return;
  }

  const user = JSON.parse(storedUser);
  this.userId = user.id;

  this.loadUserPosts();
}

loadUserPosts() {
  this.http.get<any[]>(`${this.baseUrl}/posts`).subscribe(posts => {
    this.userPosts = posts.filter(post => post.userId === this.userId);
  });
}
}
