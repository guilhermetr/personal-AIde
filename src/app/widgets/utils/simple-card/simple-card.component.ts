import { Component, Input, OnInit } from '@angular/core';

// A simple container for widgets with a header and body (ng-content)
@Component({
  selector: 'widgets-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {
  @Input() headerText: string = "";

  isExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }
}
