import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginFormComponent } from './pages/auth-page/login-form/login-form.component';
import { SignupFormComponent } from './pages/auth-page/signup-form/signup-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { UserFriendsComponent } from './pages/user-page/user-friends/user-friends.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserProfileComponent } from './pages/user-page/user-profile/user-profile.component';
import { UserRequestsComponent } from './pages/user-page/user-requests/user-requests.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { WhoPlaysPageComponent } from './pages/who-plays-page/who-plays-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'users', component: UsersPageComponent},
  {
    path: 'user', component: UserPageComponent,
    children: [
      {path: '', redirectTo: '/user/profile', pathMatch: 'full'},
      {path: 'profile', component: UserProfileComponent},
      {path: 'friends', component: UserFriendsComponent},
      {path: 'requests', component: UserRequestsComponent},
    ]
  },
  {path: 'home', component: HomePageComponent},
  {path: 'who-plays', component: WhoPlaysPageComponent},
  {path: 'stats', component: StatsPageComponent},
  {path: 'auth', component: AuthPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
