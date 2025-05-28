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
      comments: this.http.get<any[]>(`${this.baseUrl}/comments`),
      likes: this.http.get<any[]>(`${this.baseUrl}/like`)
    }).pipe(
      map(({ posts, profiles, comments, likes }) => {
        return posts.map(post => {
          const profile = profiles.find(p => p.id === post.profileId);
          const postComments = comments.filter(comm => comm.postId === post.id);
          const likeObj = likes.find(like => like.postId === post.id);
          return {
            post,
            profile,
            comments: postComments,
            likes: likeObj || { count: 0 }
          };
        });
      })
    );
  }
}
