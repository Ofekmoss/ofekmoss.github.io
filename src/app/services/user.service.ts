import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [new User('friend1'), new User('friend2'), new User('friend3'), new User('friend4'), new User('moshe'), new User('friend5'), new User('friend6')]
  userRequestsPending: User[] = [this.users[0], this.users[1]]
  userFriends: User[] = [this.users[2], this.users[3], this.users[4]]
  userRequests: User[] = [this.users[5], this.users[6]]
  constructor(private authService: AuthService) {
    console.log(this.users)
  }

  getUserById(id: number) {
    let user = this.users.filter(user => user.id === id);
    if (!this.authService.getUser()) {
      return null;
    } else if (user.length !== 0) {
      return user[0];
    } else if (this.authService.getUser().id === id) {
      let mainUserData = this.authService.getUser();
      let mainUser = new User(mainUserData.username, mainUserData.password, mainUserData.email); 
      return mainUser;
    } else {
      return null;
    }
  }
  onAddFriend(user: User) {
    this.userRequestsPending.push(user);
    console.log(this.userFriends)
  }

  onRemoveFriend(index: number) {
    this.userFriends.splice(index, 1)
  }

  onApproveRequest(index: number) {
    let user = this.userRequests.splice(index, 1)
    console.log(user)
    this.userFriends.push(user[0])
  }

  onDeclineRequest(index: number) {
    this.userRequests.splice(index, 1)
  }
}
