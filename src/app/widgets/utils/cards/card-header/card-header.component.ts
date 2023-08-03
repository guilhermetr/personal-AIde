import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'widgets-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent implements OnInit {

  @Input() headerText: string = "";
  @Output() expansionToggled = new EventEmitter<void>();
  @Input() isExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleExpansion(): void {
    this.expansionToggled.emit();    
  }

}
