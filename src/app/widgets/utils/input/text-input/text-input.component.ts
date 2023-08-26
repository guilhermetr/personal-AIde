import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'widgets-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  @Input() placeholder = "Enter text here...";

  ngOnInit(): void {}

}
