import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rate-collection',
  templateUrl: './star-rate-collection.component.html',
  styleUrls: ['./star-rate-collection.component.css']
})
export class StarRateCollectionComponent implements OnInit {
  @Input() id: string;
  constructor() { }

  ngOnInit(): void {
  }

}
