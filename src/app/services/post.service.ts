import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'http://localhost:3000/posts';
  private profilesUrl = 'http://localhost:3000/profile';
  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getPostsWithProfiles(): Observable<any[]> {
    return forkJoin([
      this.http.get<any[]>(this.postsUrl),
      this.http.get<any[]>(this.profilesUrl),
      this.http.get<any[]>(this.usersUrl)
    ]).pipe(
      map(([posts, profiles, users]) =>
        posts.map(post => {
          const profile = profiles.find(p => p.userId === post.userId);
          const user = users.find(u => u.id === post.userId);
          return {
            post,
            profile,
            user
          };
        })
      )
    );
  }

  getPostsFromFollowedUsers(currentUserId: string): Observable<any[]> {
  return forkJoin([
    this.http.get<any[]>(`http://localhost:3000/following?userId=${currentUserId}`),
    this.http.get<any[]>('http://localhost:3000/posts'),
    this.http.get<any[]>('http://localhost:3000/profile'),
    this.http.get<any[]>('http://localhost:3000/users')
  ]).pipe(
    map(([followingData, posts, profiles, users]) => {
      const followingIds = followingData[0]?.following || [];

      return posts
        .filter(post => followingIds.includes(post.userId))
        .map(post => {
          const profile = profiles.find(p => p.userId === post.userId);
          const user = users.find(u => u.id === post.userId);
          return { post, profile, user };
        });
    })
  );
}
}