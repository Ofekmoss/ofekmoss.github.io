import { Component, OnInit } from '@angular/core';
import { GameStatsService } from 'src/app/services/game-stats.service';

export interface UserGamesData {
  win: number;
  draw: number;
  lose: number;
}

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit {
  userGamesData: UserGamesData;
  userGraphData: number[];
  userGraphLabels: string[];
  constructor(public gameStatsService: GameStatsService) { }

  ngOnInit(): void {
    this.userGamesData = this.gameStatsService.getUserResults();
    this.userGraphData = [this.userGamesData.win * 900, this.userGamesData.draw * 900, this.userGamesData.lose * 900];
    this.userGraphLabels = ['Wins ('+this.userGamesData.win*100+'%)','Draws ('+this.userGamesData.draw*100+'%)','Losses ('+this.userGamesData.lose*100+'%)']

  }

}
