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

  ngOnInit(): void { }

  onClick(): void {    
    this.themeService.currentTheme = this.themeService.currentTheme === Theme.Light
      ? Theme.Dark
      : Theme.Light;        
    this.themeService.updateDocumentThemeAttributes();    
  }

  
}
