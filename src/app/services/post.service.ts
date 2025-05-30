import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  getAllUsers() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

getPostsOfCurrentUser(): Observable<any[]> {
  const currentUser: User | null = this.authService.getCurrentUser();
  if (!currentUser?.id) {
    console.warn('No current user found');
    return of([]);
  }

  return this.http.get<any[]>(`${this.baseUrl}/profile`).pipe(
    map((profiles) => {
      const found = profiles.find(profile => profile.userId === currentUser.id);
      if (!found) {
        console.warn(`No profile found for user ID: ${currentUser.id}`);
      }
      return found;
    }),
    switchMap((profile) => {
      if (!profile?.id) {
        return of([]);
      }
      return this.http.get<any[]>(`${this.baseUrl}/posts`).pipe(
        map((posts) => posts.filter(post => post.profileId === profile.id))
      );
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
