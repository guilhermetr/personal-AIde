import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-programming-card',
  templateUrl: './programming-card.component.html',
  styleUrls: ['./programming-card.component.scss']
})
export class ProgrammingCardComponent implements OnInit {

  @Input() headerText: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  toggleExpand(): void {}

}
