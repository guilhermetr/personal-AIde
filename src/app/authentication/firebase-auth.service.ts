import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signInWithGoogle(): void {
    const auth = getAuth();
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        // Navigation to the dashboard will be handled by the authState subscription
        this.router.navigate(['/dashboard']);
      }).catch((error) => {
        console.log("Error during sign in:", error);
      });
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
