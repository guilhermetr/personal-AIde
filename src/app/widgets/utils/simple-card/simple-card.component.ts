import { Component, Input, OnInit } from '@angular/core';

// A simple container for widgets with a header and body (ng-content)
@Component({
  selector: 'widgets-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.css']
})
export class SimpleCardComponent implements OnInit {
  @Input() headerText: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
