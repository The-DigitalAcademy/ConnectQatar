import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:3000';
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
      this.http.get<any[]>(`${this.baseUrl}/following`),
      this.http.get<any[]>(`${this.baseUrl}/posts`),
      this.http.get<any[]>(`${this.baseUrl}/profile`),
      this.http.get<any[]>(`${this.baseUrl}/users`)
    ]).pipe(
      map(([followingData, posts, profiles, users]) => {
        const followEntry = followingData.find(f => f.userId === currentUserId);
        const followingIds = followEntry?.following || [];

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

  getSuggestedPosts(currentUserId: string): Observable<any[]> {
  return forkJoin([
    this.http.get<any[]>(`${this.baseUrl}/following`),
    this.http.get<any[]>(`${this.baseUrl}/posts`),
    this.http.get<any[]>(`${this.baseUrl}/profile`),
    this.http.get<any[]>(`${this.baseUrl}/users`)
  ]).pipe(
    map(([followingData, posts, profiles, users]) => {
      const followEntry = followingData.find(f => f.userId === currentUserId);
      const followingIds = followEntry?.following || [];

      const suggestedUsers = users
        .filter(user => !followingIds.includes(user.id) && user.id !== currentUserId)
        .map(user => {
          const profile = profiles.find(p => p.userId === user.id);
          const userPosts = posts.filter(post => post.userId === user.id);
          return {
            id: user.id,
            name: user.fullname,
            profile,
            image: profile?.avatar,
            posts: userPosts
          };
        });

      return suggestedUsers;
    })
  );
  }

  getStoriesFromFollowedUsers(currentUserId: string): Observable<any[]> {
  return forkJoin([
    this.http.get<any[]>('http://localhost:3000/following'),
    this.http.get<any[]>('http://localhost:3000/storyUpdate'),
    this.http.get<any[]>('http://localhost:3000/users'),
    this.http.get<any[]>('http://localhost:3000/profile')
  ]).pipe(
    map(([followingData, stories, users, profiles]) => {
      const followingEntry = followingData.find(f => f.userId === currentUserId);
      const followingIds = followingEntry?.following || [];

      return stories
        .filter(story => followingIds.includes(story.userId))
        .map(story => {
          const user = users.find(u => u.id === story.userId);
          const profile = profiles.find(p => p.userId === story.userId);
          return {
            ...story,
            user,
            profile
          };
        });
      })
    );
  }


}