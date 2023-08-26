import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgrammingLanguage } from '../../enums';
import { ProgrammingService } from '../programming-card/programming-card.service';

@Component({
  selector: 'widgets-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent implements OnInit {

  @Input() headerText: string = "";
  @Output() expansionToggled = new EventEmitter<void>();
  @Input() isExpanded: boolean = false;

  @Input() isProgrammingCardHeader = false;
  
  programmingLanguages = Object.values(ProgrammingLanguage);
  selectedLanguage!: ProgrammingLanguage;

  constructor(private programmingService: ProgrammingService) { }

  ngOnInit(): void {
    this.programmingService.getSelectedLanguage().subscribe(language => {
      this.selectedLanguage = language;
    });
  }

  toggleExpansion(): void {
    this.expansionToggled.emit();    
  }

  updateSelectedLanguage(language: ProgrammingLanguage): void {
    this.programmingService.setSelectedLanguage(language);
  }

}
