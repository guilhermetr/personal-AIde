import { Component, OnInit } from '@angular/core';
import { HuggingFaceAPI } from 'src/app/services/translation-api';

@Component({
  selector: 'widgets-summarizer',
  templateUrl: './summarizer.component.html',
  styleUrls: ['./summarizer.component.css']
})
export class SummarizerComponent implements OnInit {
  title: string = "Summarizer"  
  apiService: HuggingFaceAPI;

  constructor(private _apiService: HuggingFaceAPI) {
    this.apiService = _apiService;
  }

  ngOnInit(): void { }

}
