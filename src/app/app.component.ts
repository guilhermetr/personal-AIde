import { Component } from '@angular/core';
import { SideNavToggle } from './utils/sidenav-toggle';
import { Router } from '@angular/router';
import { ThemeService } from './theme/theme.service';
import { FirebaseAuthService } from './authentication/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayLoginScreen!: boolean;
  isSidenavCollapsed: boolean = false;
  screenWidth = window.innerWidth;

  constructor(private router: Router, private themeService: ThemeService, private authService: FirebaseAuthService) { }

  ngOnInit(): void {        
    this.authService.currentUser$.subscribe(user => {
      if (user)
        this.displayLoginScreen = false;
      else
        this.displayLoginScreen = true;
    });
    this.themeService.initialize();
  }
  
  onToggleSidenav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }
}
