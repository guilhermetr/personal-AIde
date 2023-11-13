import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoResizableTextAreaComponent } from './components/input/auto-resizable-text-area/auto-resizable-text-area.component';
import { FormsModule } from '@angular/forms';
import { DualTextAreaComponent } from './components/input/dual-text-area/dual-text-area.component';
import { SimpleCardComponent } from './components/cards/simple-card/simple-card.component';
import { CardHeaderComponent } from './components/cards/card-header/card-header.component';
import { ProgrammingCardComponent } from './components/cards/programming-card/programming-card.component';
import { CodeEditorComponent } from './components/input/code-editor/code-editor.component';
import { NuMonacoEditorModule } from '@ng-util/monaco-editor';
import { RecreateViewDirective } from '../utils/directives/recreate-view.directive';
import { TextInputComponent } from './components/input/text-input/text-input.component';
import { LoadingOverlayComponent } from './components/cards/loading-overlay/loading-overlay.component';
import { SelectWidgetDialogComponent } from './components/select-widget-dialog/select-widget-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AutoResizableTextAreaComponent,
    DualTextAreaComponent,
    SimpleCardComponent,
    CardHeaderComponent,
    ProgrammingCardComponent,
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
