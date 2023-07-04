import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Timer } from 'src/app/utils/timer';
import { AutoResizableTextAreaComponent } from '../auto-resizable-text-area/auto-resizable-text-area.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'widgets-dual-text-area',
  templateUrl: './dual-text-area.component.html',
  styleUrls: ['./dual-text-area.component.css']
})
export class DualTextAreaComponent implements OnInit {
  inputText!: string;  
  
  @Input() leftPlaceholder: string = "";
  @Input() rightPlaceholder: string = "";
  @Input() outputText: string = "";

  constructor() {}
  
  ngOnInit(): void {}
  
}
