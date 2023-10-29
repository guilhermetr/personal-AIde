import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

// Dummy token from jwt.io
const DUMMY_JWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTc5NDg5MTEsImV4cCI6MTcyOTQ4NTAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.-8iXzzYGgPAdtjaZ3JHcuOjZFxoJXuq_tAEuVSiPvyk';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasValidToken());
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor() { }

  login(username: string, password: string): void {
      // Simulate API call
      var apiCallResult = username === 'admin' && password === 'admin';
      if (apiCallResult) {
        // Simulate storing the received JWT
        localStorage.setItem('jwt', DUMMY_JWT);

        if (this.hasValidToken()) {
          this._isLoggedIn.next(true);
        } else {
          // Handle login failure, perhaps show an error message
        }      
      } else {
        // Handle login failure, perhaps show an error message
      }
  }

  logout(): void {
    this._isLoggedIn.next(false);
  }

  checkLoginStatus(): boolean {
    return this._isLoggedIn.value;
  }

  private getTokenExpiration(): number | null {
    const token = localStorage.getItem('jwt');
    if (!token) return null;
  
    const decoded: any = jwtDecode(token);
    return decoded.exp;
  }

  private hasValidToken(): boolean {
    const expiration = this.getTokenExpiration();
    if (!expiration) return false;

    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    return expiration > currentTimestamp;
  }

  isTokenExpired(): boolean {
    return !this.hasValidToken();
  }
}
