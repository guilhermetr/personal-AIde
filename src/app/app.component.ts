import { Component } from '@angular/core';
import { SideNavToggle } from './utils/sidenav-toggle';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from './services/theme/theme.service';
import { FirebaseAuthService } from './services/authentication/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayLoginScreen: boolean = true;
  isSidenavCollapsed: boolean = false;
  screenWidth = window.innerWidth;

  constructor(private router: Router, private themeService: ThemeService) { }

  ngOnInit(): void {        
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.displayLoginScreen = event.url === '/login';
      }
    });
    this.themeService.initialize();
  }
  
  onToggleSidenav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }
}
