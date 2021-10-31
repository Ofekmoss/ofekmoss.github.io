import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginFormComponent } from './pages/auth-page/login-form/login-form.component';
import { SignupFormComponent } from './pages/auth-page/signup-form/signup-form.component';
import { InputComponent } from './generalComponents/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HomePageComponent,
    LoginFormComponent,
    SignupFormComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
