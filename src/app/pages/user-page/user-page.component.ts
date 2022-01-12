import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent implements OnInit {
  username: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername()
  }

}
