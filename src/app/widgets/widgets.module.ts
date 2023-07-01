import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoResizableTextAreaComponent } from './auto-resizable-text-area/auto-resizable-text-area.component';
import { TranslatorComponent } from './translator/translator.component';
import { FormsModule } from '@angular/forms';
import { SummarizerComponent } from './summarizer/summarizer.component';
import { DualTextAreaComponent } from './dual-text-area/dual-text-area.component';
import { SimpleCardComponent } from './simple-card/simple-card.component';
import { FormalizerComponent } from './formalizer/formalizer.component';

@NgModule({
  declarations: [
    TranslatorComponent,
    SummarizerComponent,
    AutoResizableTextAreaComponent,
    DualTextAreaComponent,
    SimpleCardComponent,
    FormalizerComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    TranslatorComponent,
    SummarizerComponent,
  ]
})
export class WidgetsModule { }
