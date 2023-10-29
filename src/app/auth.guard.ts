import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, Route, UrlSegment } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.checkAuthenticationState();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkAuthenticationState();
  }

  private checkAuthenticationState(): boolean {
    const isLoggedIn = this.authService.checkLoginStatus();
    const isTokenExpired = this.authService.isTokenExpired();

    if (isLoggedIn && !isTokenExpired) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
