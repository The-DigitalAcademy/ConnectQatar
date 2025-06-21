import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FollowService {
  private baseUrl = 'http://localhost:3000/following';
  private cache: { [userId: string]: any } = {};

  constructor(private http: HttpClient) {}

  getFollowingEntry(userId: string): Observable<any> {
    if (this.cache[userId]) {
      console.log(`[FollowService] Cache hit for userId: ${userId}`, this.cache[userId]);
      return of(this.cache[userId]);
    }
    console.log(`[FollowService] Cache miss for userId: ${userId}, fetching from API`);
    return this.http.get<any[]>(`${this.baseUrl}?userId=${userId}`).pipe(
      map(entries => {
        const entry = entries[0];
        if (entry) {
          console.log(`[FollowService] API returned entry for userId: ${userId}`, entry);
        } else {
          console.warn(`[FollowService] No entry found for userId: ${userId}`);
        }
        return entry;
      }),
      catchError((err) => {
        console.error(`[FollowService] Error fetching following entry for userId: ${userId}`, err);
        return of(null);
      }),
      map(entry => {
        this.cache[userId] = entry;
        return entry;
      })
    );
  }

  toggleFollow(currentUserId: string, targetUserId: string): Observable<boolean> {
    console.log(`[FollowService] toggleFollow called: currentUserId=${currentUserId}, targetUserId=${targetUserId}`);
    return this.getFollowingEntry(currentUserId).pipe(
      switchMap(entry => {
        const isFollowing = entry?.following?.includes(targetUserId) ?? false;
        console.log(`[FollowService] isFollowing: ${isFollowing}`, entry);

        const updatedFollowing = isFollowing
          ? entry.following.filter((id: string) => id !== targetUserId)
          : [...(entry?.following || []), targetUserId];

        const updatedEntry = entry || { 
          userId: currentUserId, 
          following: [] 
        };
        updatedEntry.following = updatedFollowing;

        let request: Observable<any>;
        if (entry && entry.id) {
          console.log(`[FollowService] Updating existing entry with PUT: id=${entry.id}`, updatedEntry);
          request = this.http.put(`${this.baseUrl}/${entry.id}`, updatedEntry);
        } else if (entry && !entry.id) {
          console.error(`[FollowService] Entry exists but has no id!`, entry);
          return of(isFollowing);
        } else {
          console.log(`[FollowService] Creating new entry with POST`, updatedEntry);
          request = this.http.post(this.baseUrl, updatedEntry);
        }

        return request.pipe(
          map(() => {
            this.cache[currentUserId] = updatedEntry;
            console.log(`[FollowService] Follow state updated. Now following:`, updatedEntry.following);
            return !isFollowing;
          }),
          catchError(err => {
            console.error('[FollowService] Follow operation failed', err);
            return of(isFollowing);
          })
        );
      })
    );
  }
}