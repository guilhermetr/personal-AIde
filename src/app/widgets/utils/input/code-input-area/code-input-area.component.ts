import { Component, OnInit } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'app-code-input-area',
  templateUrl: './code-input-area.component.html',
  styleUrls: ['./code-input-area.component.scss']
})
export class CodeInputAreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: '{}'
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

  onCodeChanged(value: any) {
    console.log('CODE', value);
  }

}
