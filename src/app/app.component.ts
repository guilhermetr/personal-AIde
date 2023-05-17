import { Component } from '@angular/core';
import { SummarizerComponent } from './widgets/summarizer/summarizer.component';
import { TranslatorComponent } from './widgets/translator/translator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items = [
    { component: SummarizerComponent, inputs: { /* input properties */ } },
    { component: TranslatorComponent, inputs: { /* input properties */ } },
  ];
}
