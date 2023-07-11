import { Component } from '@angular/core';
import { SummarizerComponent } from './widgets/writing/summarizer/summarizer.component';
import { TranslatorComponent } from './widgets/writing/translator/translator.component';
import { SideNavToggle } from './utils/sidenav-toggle';
import { ThemeService } from './theme/theme.service';

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
  isSidenavCollapsed = false;
  screenWidth = window.innerWidth;

  constructor(public themeService: ThemeService) {}

  onToggleSidenav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }
}
