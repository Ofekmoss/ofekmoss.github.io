import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userFriends: User[] = [new User('friend1'), new User('friend2')]
  constructor() { }

  onAddFriend(user: User) {
    this.userFriends.push(user);
    console.log(this.userFriends)
  }

  onRemoveFriend(index: number) {
    this.userFriends.splice(index,1) 
  }
}
