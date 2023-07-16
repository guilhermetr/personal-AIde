import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Theme } from 'src/app/utils/theme';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {

  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
    // set early so no page flashes / CSS is made aware
    this.updateDocumentThemeAttributes();

    window.onload = () => {
      // set on load so screen readers can see latest value on the button
      this.updateDocumentThemeAttributes();      
    }
    
    // sync with system changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({matches:isDark}) => {
        this.themeService.currentTheme = isDark ? Theme.Dark : Theme.Light;
        this.updateDocumentThemeAttributes();
      })
  }

  onClick(): void {    
    this.themeService.currentTheme = this.themeService.currentTheme === Theme.Light
      ? Theme.Dark
      : Theme.Light;        
    this.updateDocumentThemeAttributes();    
  }

  updateDocumentThemeAttributes(): void {
    document.firstElementChild!
      .setAttribute('data-theme', this.themeService.currentTheme.toString());
  
    document
      .querySelector('#theme-toggle')
      ?.setAttribute('aria-label', this.themeService.currentTheme.toString());
  }  
}
