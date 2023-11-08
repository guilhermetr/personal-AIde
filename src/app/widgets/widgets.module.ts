import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoResizableTextAreaComponent } from './utils/input/auto-resizable-text-area/auto-resizable-text-area.component';
import { TranslatorComponent } from './components/writing/translator/translator.component';
import { FormsModule } from '@angular/forms';
import { SummarizerComponent } from './components/writing/summarizer/summarizer.component';
import { DualTextAreaComponent } from './utils/input/dual-text-area/dual-text-area.component';
import { SimpleCardComponent } from './utils/cards/simple-card/simple-card.component';
import { FormalizerComponent } from './components/writing/formalizer/formalizer.component';
import { CardHeaderComponent } from './utils/cards/card-header/card-header.component';
import { ProgrammingCardComponent } from './utils/cards/programming-card/programming-card.component';
import { CodeCleanerComponent } from './components/programming/code-cleaner/code-cleaner.component';
import { CodeEditorComponent } from './utils/input/code-editor/code-editor.component';
import { NuMonacoEditorModule } from '@ng-util/monaco-editor';
import { RecreateViewDirective } from '../utils/directives/recreate-view.directive';
import { TextInputComponent } from './utils/input/text-input/text-input.component';
import { LoadingOverlayComponent } from './utils/cards/loading-overlay/loading-overlay.component';
import { SelectWidgetDialogComponent } from './components/select-widget-dialog/select-widget-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    TranslatorComponent,
    SummarizerComponent,
    AutoResizableTextAreaComponent,
    DualTextAreaComponent,
    SimpleCardComponent,
    FormalizerComponent,
    CardHeaderComponent,
    ProgrammingCardComponent,
    CodeCleanerComponent,
    CodeEditorComponent,
    RecreateViewDirective,
    TextInputComponent,
    LoadingOverlayComponent,
    SelectWidgetDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NuMonacoEditorModule,
    MatInputModule,
    MatSelectModule,    
    MatCheckboxModule,
  ],
  exports: []
})
export class WidgetsModule { }
