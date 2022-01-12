import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-headers',
  templateUrl: './second-headers.component.html',
  styleUrls: ['./second-headers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondHeadersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
