import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';

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
import { GeneralButtonComponent } from './generalComponents/general-button/general-button.component';
import { TeamsDrawComponent } from './pages/home-page/teams-draw/teams-draw.component';
import { TeamDetailsComponent } from './generalComponents/team-details/team-details.component';
import { StarsRateSellectionComponent } from './generalComponents/stars-rate-sellection/stars-rate-sellection.component';
import { StarRateCollectionComponent } from './generalComponents/stars-rate-sellection/star-rate-collection/star-rate-collection.component';
import { TeamComponent } from './pages/home-page/teams-draw/team/team.component';
import { GeneralLinkTextComponent } from './generalComponents/general-link-text/general-link-text.component';
import { ChipsInputComponent } from './generalComponents/chips-input/chips-input.component';
import { ChipComponent } from './generalComponents/chips-input/chip/chip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipInput, MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { GeneralToggleButtonComponent } from './generalComponents/general-toggle-button/general-toggle-button.component';
import { LogoComponent } from './generalComponents/logo/logo.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SecondHeadersComponent } from './pages/user-page/second-headers/second-headers.component';
import { UserProfileComponent } from './pages/user-page/user-profile/user-profile.component';
import { UserFriendsComponent } from './pages/user-page/user-friends/user-friends.component';
import { UserRequestsComponent } from './pages/user-page/user-requests/user-requests.component';
import { GeneralFriendComponent } from './generalComponents/general-friend/general-friend.component';

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
    UsersPageComponent,
    GeneralButtonComponent,
    TeamsDrawComponent,
    TeamDetailsComponent,
    StarsRateSellectionComponent,
    StarRateCollectionComponent,
    TeamComponent,
    GeneralLinkTextComponent,
    ChipsInputComponent,
    ChipComponent,
    GeneralToggleButtonComponent,
    LogoComponent,
    UserPageComponent,
    SecondHeadersComponent,
    UserProfileComponent,
    UserFriendsComponent,
    UserRequestsComponent,
    GeneralFriendComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({usersList: usersListReducer}),
    BrowserAnimationsModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
