import { Component, OnInit } from '@angular/core';
import { GameStatsService } from 'src/app/services/game-stats.service';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit {
  
  constructor(public gameStatsService: GameStatsService) { }

  ngOnInit(): void {
  }

}
