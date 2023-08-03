import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoResizableTextAreaComponent } from './utils/inputs/auto-resizable-text-area/auto-resizable-text-area.component';
import { TranslatorComponent } from './writing/translator/translator.component';
import { FormsModule } from '@angular/forms';
import { SummarizerComponent } from './writing/summarizer/summarizer.component';
import { DualTextAreaComponent } from './utils/inputs/dual-text-area/dual-text-area.component';
import { SimpleCardComponent } from './utils/cards/simple-card/simple-card.component';
import { FormalizerComponent } from './writing/formalizer/formalizer.component';
import { TextInputAreaComponent } from './utils/inputs/text-input-area/text-input-area.component';
import { CardHeaderComponent } from './utils/cards/card-header/card-header.component';
import { ProgrammingCardComponent } from './utils/cards/programming-card/programming-card.component';
import { CodeCleanerComponent } from './programming/code-cleaner/code-cleaner.component';

@NgModule({
  declarations: [
    TranslatorComponent,
    SummarizerComponent,
    AutoResizableTextAreaComponent,
    DualTextAreaComponent,
    SimpleCardComponent,
    FormalizerComponent,
    TextInputAreaComponent,
    CardHeaderComponent,
    ProgrammingCardComponent,
    CodeCleanerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: []
})
export class WidgetsModule { }
