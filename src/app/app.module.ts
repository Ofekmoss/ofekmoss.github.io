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
import { StoreModule } from '@ngrx/store';
import { usersListReducer } from './pages/auth-page/store/users-list.reducer';
import { HeadersComponent } from './generalComponents/headers/headers.component';
import { WhoPlaysPageComponent } from './pages/who-plays-page/who-plays-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UserCardComponent } from './pages/users-page/user-card/user-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HomePageComponent,
    LoginFormComponent,
    SignupFormComponent,
    InputComponent,
    UserCardComponent,
    HeadersComponent,
    WhoPlaysPageComponent,
    UsersPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({usersList: usersListReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
