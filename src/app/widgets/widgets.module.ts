import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoResizableTextAreaComponent } from './utils/auto-resizable-text-area/auto-resizable-text-area.component';
import { TranslatorComponent } from './writing/translator/translator.component';
import { FormsModule } from '@angular/forms';
import { SummarizerComponent } from './writing/summarizer/summarizer.component';
import { DualTextAreaComponent } from './utils/dual-text-area/dual-text-area.component';
import { SimpleCardComponent } from './utils/simple-card/simple-card.component';
import { FormalizerComponent } from './writing/formalizer/formalizer.component';
import { TextInputAreaComponent } from './utils/text-input-area/text-input-area.component';
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
    CodeCleanerComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: []
})
export class WidgetsModule { }
