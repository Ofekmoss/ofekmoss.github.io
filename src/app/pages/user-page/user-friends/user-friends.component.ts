import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFriendsComponent implements OnInit {
  userFriends: User[];
  userRequestsPending: User[];
  addFriendForm: FormGroup;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userFriends = this.userService.userFriends;
    this.userRequestsPending = this.userService.userRequestsPending;
    this.addFriendForm = new FormGroup({
      'username': new FormControl('', Validators.required),
    })
  }

  onRemoveFriendClick(index: number) {
    this.userService.onRemoveFriend(index);
  }

  onAddFriendClick() {
    this.userService.onAddFriend(new User(this.addFriendForm.value.username));
    this.addFriendForm.reset();
  }
}
