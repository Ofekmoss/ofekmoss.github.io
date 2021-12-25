import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../shared/user.model';
import * as usersListActions from '../pages/auth-page/store/users-list.actions'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private store: Store<{ usersList: { users: User[] } }>) { }

  public checkIfActiveUser() {
    const userId = localStorage.getItem("activeUserId")
    console.log(userId)

    if (!userId) {
      this.router.navigate(['/auth'])
    }
  }

  private makeUserActive(username: string) {
    let userId = Math.random();
    console.log(userId);
    localStorage.setItem('activeUserId', JSON.stringify(userId));
    if (username) {
      localStorage.setItem('activeUsername', username);
    }
  }
  public signup(user: User) {
    console.log(user);
    this.store.dispatch(new usersListActions.AddUser(user));
    this.makeUserActive(user.username)
    this.router.navigate(['/home']);
  }
  public login(user: User) {
    console.log(user);
    this.makeUserActive(user.username)
    this.router.navigate(['/home']);
  }
  public enterAsGuest() {
    this.makeUserActive(null)
    this.router.navigate(['/home']);
  }
  public logout() {
    localStorage.removeItem('activeUserId');
    localStorage.removeItem('activeUsername');
    this.router.navigate(['/auth']);
  }
}
