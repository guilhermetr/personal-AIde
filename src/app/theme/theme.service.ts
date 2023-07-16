import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public currentTheme = this.getColorPreference();
  private storageKey = 'theme-preference';

  constructor() {}

  getColorPreference() {
    var colorPreference = localStorage.getItem(this.storageKey);
    if (colorPreference)
      return colorPreference;
    else
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  }

  setPreference() {
    localStorage.setItem(this.storageKey, this.currentTheme);
    this.reflectPreference();
  }

  reflectPreference() {
    document.firstElementChild!
      .setAttribute('data-theme', this.currentTheme);
  
    document
      .querySelector('#theme-toggle')
      ?.setAttribute('aria-label', this.currentTheme);
  }
}
