import { Component, OnInit } from '@angular/core';
import { HuggingFaceAPI } from '../../../services/hugging-face-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'widgets-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
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
