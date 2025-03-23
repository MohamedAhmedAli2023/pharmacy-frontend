import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { AuthResponse, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('auth/login', credentials).pipe(
      tap((response) => this.api.setToken(response.token))
    );
  }

  register(user:User): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('auth/register', user);
  }

  logout(): Observable<{ message: string }> {
    return this.api.post<{ message: string }>('auth/logout', {}).pipe(
      tap(() => this.api.clearToken())
    );
  }

  getUser(): Observable<User> {
    return this.api.get<User>('auth/user');
  }

  isAuthenticated(): boolean {
    return this.api.isAuthenticated();
  }
}
