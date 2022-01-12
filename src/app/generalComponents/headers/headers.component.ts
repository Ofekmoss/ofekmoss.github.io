import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadersComponent implements OnInit {
  guestUser: boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.guestUser = this.authService.checkIfGuest();
  }

  onLogout() {
    this.authService.logout();
  }

  onUserIconClick() {
    this.router.navigate(['/user'])
  }
}
