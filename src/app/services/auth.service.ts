import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

export interface User {
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
    // Save to server
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(() => {
        // You might want to auto-login after signup here or just notify success
      })
    );
  }

  login(username: string, password: string) {
    // json-server doesn't support login, so simulate by fetching all users & checking
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`).pipe(
      map(users => {
        const user = users[0];
        if (user && user.password === password) {
          // Save token in localStorage (mock token)
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
}