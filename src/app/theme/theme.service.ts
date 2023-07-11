import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = true;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    // Apply theme styles here
    // e.g., add or remove CSS classes, update theme variables, etc.
  }

  isDarkThemeEnabled() {
    return this.isDarkTheme;
  }
}
