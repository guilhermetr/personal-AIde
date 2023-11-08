import { Component, OnInit } from '@angular/core';
import { HuggingFaceAPI } from 'src/app/services/hugging-face-api';

@Component({
  selector: 'app-formalizer',
  templateUrl: './formalizer.component.html',
  styleUrls: ['./formalizer.component.scss']
})
export class FormalizerComponent implements OnInit {
  title: string = "Formalizer";
  apiResponseText: string = "";

  constructor(private apiService: HuggingFaceAPI) { }

  ngOnInit(): void {}

  makeApiRequest(inputText: string) {
    const data = { input: inputText };      
    this.apiService.postTranslationData(data.input).subscribe((response: any) => {
      console.log(response[0]);
      // this.apiResponseText = response[0].translation_text;
    });    
  }
}
