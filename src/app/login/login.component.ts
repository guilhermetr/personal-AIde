import { Component, EventEmitter, Output } from '@angular/core';
import { FirebaseAuthService } from '../authentication/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: FirebaseAuthService, private router: Router) {}

  onGoogleSignIn(): void {
    this.authService.signInWithGoogle();
  }
}
