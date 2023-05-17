import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoResizableTextAreaComponent } from './auto-resizable-text-area/auto-resizable-text-area.component';
import { MainBorderDirective } from './directives/main-border.directive';
import { TranslatorComponent } from './translator/translator.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TranslatorComponent,
    AutoResizableTextAreaComponent,    
    MainBorderDirective,  
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    TranslatorComponent,
  ]
})
export class WidgetsModule { }
