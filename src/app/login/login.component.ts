import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  onGoogleSignIn(): void {}

  onSubmit(): void {
    // TODO: Add client-side validation 
    this.authService.login(this.username, this.password);    
    if (this.authService.checkLoginStatus())
      this.router.navigate(['/dashboard']);
  }
}
