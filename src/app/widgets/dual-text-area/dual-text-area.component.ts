import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Timer } from 'src/app/utils/timer';
import { AutoResizableTextAreaComponent } from '../auto-resizable-text-area/auto-resizable-text-area.component';

@Component({
  selector: 'widgets-dual-text-area',
  templateUrl: './dual-text-area.component.html',
  styleUrls: ['./dual-text-area.component.css']
})
export class DualTextAreaComponent implements OnInit {
  inputText!: string;
  responseData!: string;
  timer!: Timer;

  leftTextAreaHeight: number = 0;
  rightTextAreaHeight: number = 0;

  @ViewChild('left') leftTextArea!: AutoResizableTextAreaComponent;
  @ViewChild('right') rightTextArea!: AutoResizableTextAreaComponent;

  @Input() postData!: Function;
  @Input() leftPlaceholder: string = "";
  @Input() rightPlaceholder: string = "";

  constructor() {}
  
  ngOnInit(): void {
    this.timer = new Timer(() => this.makeApiRequest(), 2000);
  }
  
  // Starts the timer or restarts it in case it was already started
  onUserInput() {            
    this.timer.clear();
    if (this.inputText !== "") {
      this.timer.start(); 
    } else {
      this.responseData = "";
    }
  }  

  // Assigns both text areas the largest height
  onTextAreasHeightChange(textAreaNumber: number, newHeight: number) {
    if (textAreaNumber === 1) {
      this.leftTextAreaHeight = newHeight;
    } else if (textAreaNumber === 2) {
      this.rightTextAreaHeight = newHeight;
    }

    const largestHeight = Math.max(this.leftTextAreaHeight, this.rightTextAreaHeight);    

    this.leftTextArea.height = largestHeight;
    this.rightTextArea.height = largestHeight;
  }

  private makeApiRequest() {    
    const data = { input: this.inputText };
    this.postData(data.input).subscribe((response: any) => {
      this.responseData = response[0].translation_text;      
    });
  }
}
