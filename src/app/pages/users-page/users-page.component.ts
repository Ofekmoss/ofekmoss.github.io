import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.model';
import * as UsersListActions from '../auth-page/store/users-list.actions'

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  users: Observable<{ users: User[] }>;
  constructor(private authService: AuthService, private store: Store<{ usersList: { users: User[] } }>) { }

  ngOnInit(): void {
    this.authService.checkIfActiveUser();
    this.users = this.store.select('usersList');
    console.log(this.users);
  }
  

  onCardClick(index: number) {
    // console.log(user)
    // console.log(user.index)
    // user.updateUsername("ofirmossinson")
    this.store.dispatch(new UsersListActions.UpdateUsername({username: "ofirmossinson", userIndex: index}))
    console.log(this.store.select('usersList'))
    console.log(this.users[index])
  }

}
