import { Component, Input, OnInit } from '@angular/core';
import { GameStatsService } from 'src/app/services/game-stats.service';
import { GameStats } from 'src/app/shared/gameStats.model';
import { Team } from 'src/app/shared/team.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-general-game-data',
  templateUrl: './general-game-data.component.html',
  styleUrls: ['./general-game-data.component.css']
})
export class GeneralGameDataComponent implements OnInit {
  @Input() game: GameStats;
  homeTeam: Team;
  homePlayers: User[];
  awayTeam: Team;
  awayPlayers: User[];
  score: number[];
  constructor(private gameStatsService: GameStatsService) { }

  ngOnInit(): void {
    this.homeTeam = this.gameStatsService.getHomeTeamFromGameStats(this.game)
    this.awayTeam = this.gameStatsService.getAwayTeamFromGameStats(this.game)
    this.homePlayers = this.gameStatsService.getHomePlayersFromGameStats(this.game)
    this.awayPlayers = this.gameStatsService.getAwayPlayersFromGameStats(this.game)
  }

}
