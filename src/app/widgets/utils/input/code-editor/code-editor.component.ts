import { Component, Input, OnInit } from '@angular/core';
import { NuMonacoEditorEvent, NuMonacoEditorModel } from '@ng-util/monaco-editor';
import { ProgrammingLanguage } from '../../enums';
import { ProgrammingService } from '../../cards/programming-card/programming-card.service';

@Component({
  selector: 'widgets-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  @Input() readonly: boolean = false;
  options = { theme: 'vs-dark' };
  model!: NuMonacoEditorModel;
  selectedLanguage: ProgrammingLanguage = ProgrammingLanguage.JavaScript;
  codeInput: string = "";

  constructor(private programmingService: ProgrammingService) {}

  ngOnInit(): void {
    this.model = {      
      language: this.selectedLanguage.toString(),
    };

    // Subscribe to the selected language changes
    this.programmingService.getSelectedLanguage().subscribe(language => {
      this.selectedLanguage = language;
      this.model.language = ProgrammingLanguage[language as keyof typeof ProgrammingLanguage].toLowerCase();
    });
  }
}
