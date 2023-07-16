import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from '../theme.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {

  constructor(public themeService: ThemeService, @Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2) { }

  ngOnInit(): void {
    // set early so no page flashes / CSS is made aware
    this.themeService.reflectPreference();

    window.onload = () => {
      // set on load so screen readers can see latest value on the button
      this.themeService.reflectPreference();
    
      // now this script can find and listen for clicks on the control
      document
        .querySelector('#theme-toggle')!
        .addEventListener('click', this.onClick.bind(this));
    }
    
    // sync with system changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({matches:isDark}) => {
        this.themeService.currentTheme = isDark ? 'dark' : 'light';
        this.themeService.setPreference();
      })
  }

  onClick() {
    // flip current value
    this.themeService.currentTheme = this.themeService.currentTheme === 'light'
      ? 'dark'
      : 'light';
    
    this.renderer.setAttribute(this.document.body, 'class', `${this.themeService.currentTheme}-theme`);

    this.themeService.setPreference();
  }
}
