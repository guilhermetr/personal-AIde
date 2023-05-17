import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TranslatorComponent } from './widgets/translator/translator.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from './widgets/widgets.module';

@NgModule({
  declarations: [
    AppComponent,      
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    WidgetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
