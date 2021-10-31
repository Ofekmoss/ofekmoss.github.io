import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  currentPage = 'login';
  constructor() { }

  ngOnInit(): void {
  }

  onChangePage() {
    this.currentPage = this.currentPage === 'login' ? 'signup' : 'login';
  }
}
