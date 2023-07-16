import { Injectable } from '@angular/core';
import { Theme, convertStringToTheme } from '../utils/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'theme-preference';
  private _currentTheme: Theme = this.getColorPreference();

  get currentTheme(): Theme {
    return this._currentTheme;
  }

  set currentTheme(value: Theme) {
    if (this._currentTheme !== value) {
      this._currentTheme = value;
      this.setPreference();
      this.toggleDarkTheme();
    }
  }

  constructor() {
    if (this.currentTheme == Theme.Dark) {
      this.toggleDarkTheme();
    }
  }

  private getColorPreference(): Theme {
    var colorPreference = localStorage.getItem(this.storageKey);
    if (colorPreference)
      return convertStringToTheme(colorPreference);
    else
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? Theme.Dark
        : Theme.Light;
  }

  private setPreference(): void {
    localStorage.setItem(this.storageKey, this.currentTheme.toString());
  }

  private toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }  
}
