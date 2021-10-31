import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  public checkIfActiveUser() {
    const userId = localStorage.getItem("activeUserId")
    console.log(userId)

    if (!userId) {
      this.router.navigate(['/auth'])
    }
  }

  public signup(user: User) {
    console.log(user)
  }
  public login(user: User) {
    console.log(user)
  }
}
