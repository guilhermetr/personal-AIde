import { Component, OnInit, ViewChild } from '@angular/core';
import { HuggingFaceAPI } from '../../services/translation-api';
import { Timer } from '../../utils/timer';
import { AutoResizableTextAreaComponent } from '../auto-resizable-text-area/auto-resizable-text-area.component';

@Component({
  selector: 'widgets-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent implements OnInit {
  title: string = "Translator"
  apiService: HuggingFaceAPI;

  constructor(private _apiService: HuggingFaceAPI) {
    this.apiService = _apiService;
  }

  ngOnInit(): void {}
 
}
