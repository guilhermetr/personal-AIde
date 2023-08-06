import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'widgets-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

  ngOnInit(): void { }

}
