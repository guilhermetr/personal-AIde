import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TranslatorComponent } from './translator/translator.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutoResizableTextAreaComponent } from './auto-resizable-text-area/auto-resizable-text-area.component';

@NgModule({
  declarations: [
    AppComponent,
    TranslatorComponent,
    AutoResizableTextAreaComponent,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
