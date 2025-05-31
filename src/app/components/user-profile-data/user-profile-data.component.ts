import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile-data',
  imports: [],
  templateUrl: './user-profile-data.component.html',
  styleUrl: './user-profile-data.component.css'
})
export class UserProfileDataComponent {
url: string = '';
  postsCount: number = 0;
  followers: number = 0;
  following: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    const userId = user.id;

    // Get profile info from the server
    this.http.get<any[]>(`http://localhost:3000/profile?userId=${userId}`)
      .subscribe(profile => {
        if (profile.length > 0) {
          const data = profile[0];
          this.url = data.avatar;
          this.followers = data.followCount;
          this.following = data.followingCount;
        }
      });

    this.http.get<any[]>(`http://localhost:3000/posts?userId=${userId}`)
      .subscribe(posts => {
        this.postsCount = posts.length;
      });
  }
}
