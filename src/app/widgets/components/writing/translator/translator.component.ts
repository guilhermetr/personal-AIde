import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HuggingFaceAPI } from 'src/app/services/hugging-face-api';

@Component({
  selector: 'widgets-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})
export class TranslatorComponent implements OnInit {
  title: string = "Translator";
  apiResponseText: string = "";

  constructor(private apiService: HuggingFaceAPI) { }

  ngOnInit(): void {}

  makeApiRequest(inputText: string) {
    const data = { input: inputText };      
    this.apiService.postTranslationData(data.input).subscribe((response: any) => {
      console.log(response[0]);
      this.apiResponseText = response[0].translation_text;      
    });    
  }
 
}
