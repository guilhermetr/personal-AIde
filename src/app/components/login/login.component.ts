import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/authentication/firebase-auth.service';

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
