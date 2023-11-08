import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HuggingFaceAPI } from 'src/app/services/hugging-face-api';

@Component({
  selector: 'widgets-summarizer',
  templateUrl: './summarizer.component.html',
  styleUrls: ['./summarizer.component.scss']
})
export class SummarizerComponent implements OnInit {
  title: string = "Summarizer"  
  apiResponseText: string = "";

  constructor(private apiService: HuggingFaceAPI) { }

  ngOnInit(): void { }

  makeApiRequest(inputText: string) {
    const data = { input: inputText };      
    this.apiService.postSummarizerData(data.input).subscribe((response: any) => {
      console.log(response[0]);
      this.apiResponseText = response[0].summary_text;      
    });    
  }

}
