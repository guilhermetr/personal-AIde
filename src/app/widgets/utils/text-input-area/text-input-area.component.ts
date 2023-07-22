import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'widgets-text-input-area',
  templateUrl: './text-input-area.component.html',
  styleUrls: ['./text-input-area.component.scss']
})
export class TextInputAreaComponent implements OnInit {
  
  inputValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }  

  updateInputPosition(value: string) {
    // this.inputValue = value;
  }

  insertInputValue() {
    // Implement any additional logic here if needed when the input is inserted.
  }
}
