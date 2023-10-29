import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from './widgets/widgets.module';
import { GridComponent } from './grid/grid.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BodyComponent } from './body/body.component';
import { CategoriesComponent } from './categories/categories.component';
import { ThemeToggleComponent } from './theme/theme-toggle/theme-toggle.component';
import { NuMonacoEditorModule } from '@ng-util/monaco-editor';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthRedirectGuard } from './auth-redirect.guard';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [AuthRedirectGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    children: [
      { path: ':categoryName', component: CategoriesComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];




@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    HeaderComponent,    
    SidenavComponent,
    DashboardComponent,
    BodyComponent,
    CategoriesComponent,
    ThemeToggleComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    WidgetsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    NuMonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
