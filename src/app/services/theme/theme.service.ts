import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme, convertStringToTheme } from 'src/app/utils/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'theme-preference';
  private _currentTheme: Theme = this.getColorPreference();
  private currentThemeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this._currentTheme);

  get currentTheme(): Theme {
    return this._currentTheme;
  }

  set currentTheme(value: Theme) {
    if (this._currentTheme !== value) {
      this._currentTheme = value;
      this.setPreference();
      this.toggleDarkTheme();
      this.currentThemeSubject.next(value);
    }
  }

  constructor() {
    if (this.currentTheme == Theme.Dark) {
      this.toggleDarkTheme();
    }
  }
  
  initialize(): void {
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
        this.currentTheme = isDark ? Theme.Dark : Theme.Light;
        this.updateDocumentThemeAttributes();
      })
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
      
  getCurrentTheme(): Observable<Theme> {
    return this.currentThemeSubject.asObservable();
  }

  updateDocumentThemeAttributes(): void {
    document.firstElementChild!
      .setAttribute('data-theme', this.currentTheme.toString());
  
    document
      .querySelector('#theme-toggle')
      ?.setAttribute('aria-label', this.currentTheme.toString());
  }  
}
