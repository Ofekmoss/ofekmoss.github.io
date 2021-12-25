import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-stars-rate-sellection',
  templateUrl: './stars-rate-sellection.component.html',
  styleUrls: ['./stars-rate-sellection.component.css'],
})
export class StarsRateSellectionComponent implements OnInit {
  @Output() starLevel = new EventEmitter<string>();
  @Input() id: string;
  @Input() currentStar: number;
  constructor() { }

  ngOnInit(): void {
  }
  
  onStarClicked(star: string) {
    switch (star) {
      case '5': 
        this.starLevel.emit('5_stars')
        break;
      case '4.5': 
        this.starLevel.emit('4.5_stars')
        break;
      case '4': 
        this.starLevel.emit('4_stars')
        break;
      case '3.5': 
        this.starLevel.emit('3.5_stars')
        break;

    }
    // console.log(star.srcElement)
  }
}
