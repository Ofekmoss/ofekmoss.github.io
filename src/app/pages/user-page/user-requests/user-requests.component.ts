import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRequestsComponent implements OnInit {
  userRequests: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userRequests = this.userService.userRequests;
  }

  onApproveRequestClick(index: number) {
    this.userService.onApproveRequest(index)
  }

  onDeclineRequestClick(index: number) {
    this.userService.onDeclineRequest(index)
  }

}
