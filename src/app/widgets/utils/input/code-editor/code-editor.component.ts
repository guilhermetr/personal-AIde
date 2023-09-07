import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NuMonacoEditorModel } from '@ng-util/monaco-editor';
import { ProgrammingLanguage } from '../../enums';
import { ProgrammingService } from '../../cards/programming-card/programming-card.service';
import { ThemeService } from 'src/app/theme/theme.service';
import { Theme } from 'src/app/utils/theme';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'widgets-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true
    }
  ]
})
export class CodeEditorComponent implements OnInit, ControlValueAccessor {
  @Input() readonly: boolean = false;
  options = { theme: 'vs-dark' };  
  model!: NuMonacoEditorModel;  

  updateView!: boolean;

  private _value: string = '';
  get value(): string {
    return this._value;
  }
  set value(val: string) {
    this._value = val;
    this.onChange(val);  // Notify the parent component about the change
    this.onTouched();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

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
  
  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
