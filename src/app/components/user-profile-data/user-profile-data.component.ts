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

  imageUrl: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s'; 
  user: any = null;

 


  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    const userId = user.id;

    this.http.get<any[]>('http://localhost:3000/following').subscribe(data => {
      const entry = data.find(f => f.userId === userId);
      this.following = entry?.following?.length || 0;

      this.followers = data.filter(f => f.following.includes(userId)).length;
    });

    this.http.get<any[]>(`http://localhost:3000/posts?userId=${userId}`)
      .subscribe(posts => {
        this.postsCount = posts.length;
      });


       const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.user = user;
      const userId = user.id || user.userId;
      const storedImage = localStorage.getItem(`profileImage_${userId}`);
      if (storedImage) {
        this.imageUrl = storedImage;
      }
    }
  }
}
