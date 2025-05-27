import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getPostsWithDetails(): Observable<any[]> {
    return forkJoin({
      posts: this.http.get<any[]>(`${this.baseUrl}/posts`),
      users: this.http.get<any[]>(`${this.baseUrl}/users`),
      comments: this.http.get<any[]>(`${this.baseUrl}/comments`),
      likes: this.http.get<any[]>(`${this.baseUrl}/likes`),
      friendships: this.http.get<any[]>(`${this.baseUrl}/friendships`)
    }).pipe(
      map(({ posts, users, comments, likes, friendships }) => {
        return posts.map(post => {
          // post's author
          const author = users.find(u => u.id === post.userId);

          //  followings
          const followingIds = friendships
            .filter(f => f.followerId === author?.id)
            .map(f => f.followingId);

          const followings = users.filter(u => followingIds.includes(u.id));

          const postComments = comments.filter(comm => comm.postId === post.id);
          const likeObj = likes.find(like => like.postId === post.id);

          return {
            post,
            author,
            followings,
            comments: postComments,
            likes: likeObj || { count: 0 }
          };
        });
      })
    );
  }
}