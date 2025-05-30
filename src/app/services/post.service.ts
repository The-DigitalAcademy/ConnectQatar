import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  getAllUsers() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getPostsWithDetails(): Observable<any[]> {
    return forkJoin({
      posts: this.http.get<any[]>(`${this.baseUrl}/posts`),
      profiles: this.http.get<any[]>(`${this.baseUrl}/profile`),
      
    }).pipe(
      map(({ posts, profiles }) => {
        return posts.map(post => {
          const profile = profiles.find(p => p.id === post.profileId);
          
          return {
            post,
            profile,
          
          };
        });
      })
    );
  }
}
