import { Component } from '@angular/core';
import { SummarizerComponent } from './widgets/writing/summarizer/summarizer.component';
import { TranslatorComponent } from './widgets/writing/translator/translator.component';
import { SideNavToggle } from './utils/sidenav-toggle';
import { ThemeService } from './theme/theme.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [
    { component: SummarizerComponent, inputs: { /* input properties */ } },
    { component: TranslatorComponent, inputs: { /* input properties */ } },
  ];
  isLoggedIn = false;
  isSidenavCollapsed = false;
  screenWidth = window.innerWidth;

  constructor(public themeService: ThemeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
  
  onToggleSidenav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }
}
