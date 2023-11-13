import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgrammingLanguage } from '../../../utils/enums';
import { ProgrammingService } from '../programming-card/programming-card.service';

@Component({
  selector: 'widgets-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent implements OnInit {

  @Input() headerText: string = "";
  @Input() isExpanded: boolean = false;
  @Input() isProgrammingCardHeader = false;

  @Output() copyRequested = new EventEmitter<void>();
  @Output() expansionToggled = new EventEmitter<void>();  
  
  programmingLanguages = Object.values(ProgrammingLanguage);
  selectedLanguage!: ProgrammingLanguage;
  showCopyTooltip: boolean = false;

  constructor(private programmingService: ProgrammingService) { }

  ngOnInit(): void {
    this.programmingService.getSelectedLanguage().subscribe(language => {
      this.selectedLanguage = language;
    });
  }  

  onCopy() {
    this.copyRequested.emit();
    this.showCopyTooltip = true;
      setTimeout(() => {
          this.showCopyTooltip = false;
      }, 1500); // Hide the tooltip after 1.5 seconds
  }

  toggleExpansion(): void {
    this.expansionToggled.emit();    
  }

  updateSelectedLanguage(language: ProgrammingLanguage): void {
    this.programmingService.setSelectedLanguage(language);
  }    
}
