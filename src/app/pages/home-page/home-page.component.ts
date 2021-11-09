import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  users: Observable<{users: User[]}>;
  constructor(private authService: AuthService, private store: Store<{usersList: {users: User[]}}>) { }

  ngOnInit(): void {
    this.authService.checkIfActiveUser();
    this.users = this.store.select('usersList');
    console.log(this.users);
  }
   onLogout() {
     this.authService.logout();
   }
}
