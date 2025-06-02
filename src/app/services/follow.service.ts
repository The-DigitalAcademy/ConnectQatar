import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FollowService {
  private baseUrl = 'http://localhost:3000/following';

  constructor(private http: HttpClient) {}

  getFollowingEntry(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}?userId=${userId}`).pipe(
      switchMap(entries => of(entries[0]))
    );
  }

  toggleFollow(currentUserId: string, targetUserId: string): Observable<any> {
    return this.getFollowingEntry(currentUserId).pipe(
      switchMap(entry => {
        if (!entry) {
          const newEntry = {
            userId: currentUserId,
            following: [targetUserId]
          };
          return this.http.post(this.baseUrl, newEntry);
        }

        const isFollowing = entry.following.includes(targetUserId);
        const updatedFollowing = isFollowing
          ? entry.following.filter((id: string) => id !== targetUserId)
          : [...entry.following, targetUserId];

        const updatedEntry = { ...entry, following: updatedFollowing };
        return this.http.put(`${this.baseUrl}/${entry.id}`, updatedEntry);
      })
    );
  }

  isFollowing(currentUserId: string, targetUserId: string): Observable<boolean> {
    return this.getFollowingEntry(currentUserId).pipe(
      switchMap(entry => of(entry?.following?.includes(targetUserId) ?? false))
    );
  }
}
