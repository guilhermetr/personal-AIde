import { Component } from '@angular/core';
import { SideNavToggle } from './utils/sidenav-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayLoginScreen!: boolean;
  isSidenavCollapsed: boolean = false;
  screenWidth = window.innerWidth;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.displayLoginScreen = this.router.url == '/login';
  }
  
  onToggleSidenav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }
}
