import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

getPostsOfCurrentUser(): Observable<any[]> {
  const user = this.authService.getCurrentUser();
  if (!user?.id) return of([]);

  // Fetch the profile for the current user
  return this.http.get<any[]>(`${this.baseUrl}/profile`, {
    params: { userId: user.id }  // Filter by user ID
  }).pipe(
    switchMap(profiles => {
      // Check if we found the user's profile
      if (!profiles || profiles.length === 0) {
        console.warn('No profile found for user:', user.id);
        return of([]);
      }

      // Since each user has only one profile, take the first match
      const profile = profiles[0];
      const profileId = profile.id;

      // Fetch posts ONLY for this specific profile
      return this.http.get<any[]>(`${this.baseUrl}/posts`, {
        params: {
          profileId: profileId,  // Only fetch posts for this profile
          _sort: 'id',
          _order: 'desc'
        }
      });
    }),
    catchError(error => {
      console.error('Error fetching posts:', error);
      return of([]);
    })
  );
}


  getPostsWithDetails(): Observable<any[]> {
    return forkJoin({
      posts: this.http.get<any[]>(`${this.baseUrl}/posts`),
      profiles: this.http.get<any[]>(`${this.baseUrl}/profile`),
    }).pipe(
      map(({ posts, profiles }) => {
        return posts.map((post) => {
          const profile = profiles.find((p) => p.id === post.profileId);

          return {
            post,
            profile,
          };
        });
      })
    );
  }
}
