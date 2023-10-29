import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';  // Update the path accordingly

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.checkLoginStatus()) {
      // If the user is logged in, redirect them to the dashboard
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
