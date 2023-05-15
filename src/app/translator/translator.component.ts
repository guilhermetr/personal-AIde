import { Component, ViewChild } from '@angular/core';
import { TranslationAPI } from '../services/translation-api';
import { Timer } from '../utils/timer';
import { AutoResizableTextAreaComponent } from '../auto-resizable-text-area/auto-resizable-text-area.component';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent {
  inputText!: string;
  responseData!: string;
  timer: Timer;

  toTranslateTextAreaHeight: number = 0;
  translatedTextAreaHeight: number = 0;

  @ViewChild('toTranslate') toTranslateTextArea!: AutoResizableTextAreaComponent;
  @ViewChild('translated') translatedTextArea!: AutoResizableTextAreaComponent;    

  constructor(private apiService: TranslationAPI) {
    this.timer = new Timer(() => this.makeApiRequest(), 2000);
  }
    
  onUserInput() {        
    // Start the timer or restart it in case it was already started
    this.timer.clear();
    if (this.inputText !== "") {
      this.timer.start(); 
    } else {
      this.responseData = "";
    }
  }  

  onTextAreasHeightChange(childNumber: number, newHeight: number) {
    if (childNumber === 1) {
      this.toTranslateTextAreaHeight = newHeight;
    } else if (childNumber === 2) {
      this.translatedTextAreaHeight = newHeight;
    }

    const largestHeight = Math.max(this.toTranslateTextAreaHeight, this.translatedTextAreaHeight);    

    this.toTranslateTextArea.height = largestHeight;
    this.translatedTextArea.height = largestHeight;
  }

  private makeApiRequest() {    
    const data = { input: this.inputText };
    this.apiService.post(data.input).subscribe(response => {
      this.responseData = response[0].translation_text;      
    });
  }
}
