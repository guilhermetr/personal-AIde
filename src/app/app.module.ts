import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from './widgets/widgets.module';
import { GridComponent } from './grid/grid.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BodyComponent } from './body/body.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },  
  { path: 'categories/:categoryName', component: CategoriesComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    HeaderComponent,    
    SidenavComponent,
    DashboardComponent,
    BodyComponent,
    CategoriesComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    WidgetsModule,
    BrowserAnimationsModule,
    MatToolbarModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
