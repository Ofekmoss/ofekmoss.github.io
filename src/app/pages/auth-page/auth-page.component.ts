import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent implements OnInit {
  currentPage = 'login';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.onEnterAsGuest(); //ONLY FOR ALPHA
  }

  onChangePage() {
    this.currentPage = this.currentPage === 'login' ? 'signup' : 'login';
    // this.authService.onChangePage()
  }

  onEnterAsGuest() {
    this.authService.enterAsGuest()
  }
}
