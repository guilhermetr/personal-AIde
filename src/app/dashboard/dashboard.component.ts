import { Component, OnInit } from '@angular/core';
import { SummarizerComponent } from '../widgets/summarizer/summarizer.component';
import { TranslatorComponent } from '../widgets/translator/translator.component';
import { FormalizerComponent } from '../widgets/formalizer/formalizer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items = [
    { component: SummarizerComponent, inputs: { /* input properties */ } },
    { component: TranslatorComponent, inputs: { /* input properties */ } },
    { component: FormalizerComponent, inputs: { /* input properties */ } },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
