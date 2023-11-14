import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private snackBar: MatSnackBar, private router: Router) { }

  displayError(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'error-snackbar'
    });
  }

  displayLoginError(message: string) {
    let snackBarRef = this.snackBar.open(message, 'Sign In', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'error-snackbar',      
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
