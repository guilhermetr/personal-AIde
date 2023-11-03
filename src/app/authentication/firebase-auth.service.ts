import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private _currentUser = new BehaviorSubject<firebase.default.User | null>(null);
  currentUser$: Observable<firebase.default.User | null> = this._currentUser.asObservable();

  constructor(private afAuth: AngularFireAuth, private router: Router) {
     // Subscribe to auth state changes
     this.afAuth.authState.subscribe(user => {
      this._currentUser.next(user);
    });
  }

  signInWithGoogle(): void {
    const auth = getAuth();
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        this.router.navigate(['/dashboard']);
      }).catch((error) => {
        console.log("Error during sign in:", error);
      });
  }

  signOut(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
