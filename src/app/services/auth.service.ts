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

  public checkIfGuest() {
    const user = localStorage.getItem("activeUser");
    console.log(user);
    return user ? false : true; 
  }
  public getUsername() {
    const username = JSON.parse(localStorage.getItem("activeUser")).username;
    return username; 
  }
  public getUser() {
    const user = JSON.parse(localStorage.getItem("activeUser"));
    return user; 
  }

  private makeUserActive(user: User) {
    let userId = Math.random();
    console.log(userId);
    localStorage.setItem('activeUserId', JSON.stringify(userId));
    if (user) {
      localStorage.setItem('activeUser', JSON.stringify(user));
    }
  }
  public signup(user: User) {
    console.log(user);
    this.store.dispatch(new usersListActions.AddUser(user));
    this.makeUserActive(user)
    this.router.navigate(['/home']);
  }
  public login(user: User) {
    console.log(user);
    this.makeUserActive(user)
    this.router.navigate(['/home']);
  }
  public enterAsGuest() {
    this.makeUserActive(null)
    this.router.navigate(['/home']);
  }
  public logout() {
    localStorage.removeItem('activeUserId');
    localStorage.removeItem('activeUser');
    this.router.navigate(['/auth']);
  }
}
