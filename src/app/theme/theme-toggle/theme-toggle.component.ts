import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {

  storageKey = 'theme-preference';
  theme = {
    value: this.getColorPreference(),
  };

  constructor() { }

  ngOnInit(): void {
    // set early so no page flashes / CSS is made aware
    this.reflectPreference();

    window.onload = () => {
      // set on load so screen readers can see latest value on the button
      this.reflectPreference();
    
      // now this script can find and listen for clicks on the control
      document
        .querySelector('#theme-toggle')!
        .addEventListener('click', this.onClick.bind(this));
    }
    
    // sync with system changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({matches:isDark}) => {
        this.theme.value = isDark ? 'dark' : 'light';
        this.setPreference();
      })
  }

  onClick() {
    // flip current value
    this.theme.value = this.theme.value === 'light'
      ? 'dark'
      : 'light';
  
    this.setPreference();
  }

  setPreference() {
    localStorage.setItem(this.storageKey, this.theme.value!);
    this.reflectPreference();
  }

  reflectPreference() {
    document.firstElementChild!
      .setAttribute('data-theme', this.theme.value!);
  
    document
      .querySelector('#theme-toggle')
      ?.setAttribute('aria-label', this.theme.value!);
  }

  getColorPreference() {
    var colorPreference = localStorage.getItem(this.storageKey);
    if (colorPreference)
      return colorPreference;
    else
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  }

}
