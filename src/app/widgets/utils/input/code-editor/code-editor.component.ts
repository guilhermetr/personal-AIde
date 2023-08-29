import { Component, Input, OnInit } from '@angular/core';
import { NuMonacoEditorModel } from '@ng-util/monaco-editor';
import { ProgrammingLanguage } from '../../enums';
import { ProgrammingService } from '../../cards/programming-card/programming-card.service';
import { ThemeService } from 'src/app/theme/theme.service';
import { Theme } from 'src/app/utils/theme';

@Component({
  selector: 'widgets-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  @Input() readonly: boolean = false;
  options = { theme: 'vs-dark' };  
  model!: NuMonacoEditorModel;  
  codeInput: string = "";

  updateView!: boolean;

  constructor(private programmingService: ProgrammingService, private themeService: ThemeService) {}

  ngOnInit(): void {    
    // Subscribe to language changes
    this.programmingService.getSelectedLanguage().subscribe(language => {
      this.model = { language: ProgrammingLanguage[language as keyof typeof ProgrammingLanguage].toLowerCase() };
      this.updateView = true;
    });

    // Subscribe to theme changes
    this.themeService.getCurrentTheme().subscribe(theme => {
      if (theme == Theme.Dark)
        this.options = { theme: 'vs-dark' };
      else if (theme == Theme.Light)
        this.options = { theme: 'vs-light' };
      this.updateView = true;
    });    
  }
}
