import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

export interface User {
  id?: number;
  fullname: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  signup(user: User) {
  return this.http.post<User>(this.apiUrl, user).pipe(
    tap((createdUser) => {
      const userId = createdUser.id?.toString();
      const defaultAvatar = 'https://example.com/default-avatar.jpg';

      // These three POSTs set up the required entries for new users, create profile, following, and profile image
      if (userId) {
        this.http.post('http://localhost:3000/profile', {
          userId,
          avatar: defaultAvatar,
          followCount: 0,
          followingCount: 0
        }).subscribe();

        this.http.post('http://localhost:3000/following', {
          userId,
          following: []
        }).subscribe();

        this.http.post('http://localhost:3000/profileImage', {
          userId,
          image: defaultAvatar
        }).subscribe();
      }
    })
  );
}

  login(username: string, password: string) {
    
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`).pipe(
      map(users => {
        const user = users[0];
        if (user && user.password === password) {
         
          localStorage.setItem('token', 'mock-jwt-token');
          localStorage.setItem('currentUser', JSON.stringify(user));
          this._isLoggedIn.next(true);
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

   editUserProfile(updatedUser: User): Observable<User> {
    const currentUser = this.getCurrentUser();

    if (!currentUser) throw new Error('No user is currently logged in');
    if (!updatedUser.id) throw new Error('User ID is missing'); 

    return this.http.put<User>(`${this.apiUrl}/${updatedUser.id}`, updatedUser).pipe( 
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user)); 
      })
    );
  }
}