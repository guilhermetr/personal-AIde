import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from './widgets/widgets.module';
import { GridComponent } from './components/grid/grid.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodyComponent } from './components/body/body.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ThemeToggleComponent } from './services/theme/theme-toggle/theme-toggle.component';
import { NuMonacoEditorModule } from '@ng-util/monaco-editor';
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { environment } from '../environments/environment';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectLoggedInToDashboard } 
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'categories',
    children: [
      { path: ':categoryName', component: CategoriesComponent }
    ],
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin }
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
    NuMonacoEditorModule.forRoot(), // use forRoot() in main app module only.
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
