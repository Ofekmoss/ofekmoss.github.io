import { Injectable } from '@angular/core';
import { Chip } from '../shared/chip.model';
import { GameStats } from '../shared/gameStats.model';
import { Team } from '../shared/team.model';
import { TeamPlayers } from '../shared/teamplayers.model';
import { User } from '../shared/user.model';
import { AuthService } from './auth.service';
import { TeamService } from './team.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameStatsService {
  gamesStats: GameStats[] = [];
  constructor(private teamService: TeamService, private userService: UserService, private authService: AuthService) {
    this.gamesStats = [...this.gamesStats, new GameStats([authService.getUser().id], 3, 2, true, [userService.userFriends[0].id], 4, 1, false), new GameStats([authService.getUser().id, userService.userFriends[2].id], 1, 2, false, [], 6, 1, true), new GameStats([authService.getUser().id, userService.userFriends[1].id], 2, 12, false, [userService.userFriends[2].id], 7, 18, false), new GameStats([authService.getUser().id], 6, 1, false, [userService.userFriends[1].id, userService.userFriends[2].id], 5, 1, false)]
  }

  newGameStats(score: number[], players: TeamPlayers) {
    let homePlayersIds = players.homeTeam.map(player => player.userId)
    let homeTeamId = this.teamService.getTeamA().id
    let awayPlayersIds = players.awayTeam.map(player => player.userId)
    let awayTeamId = this.teamService.getTeamB().id
    let gameStat = new GameStats(homePlayersIds, homeTeamId, score[0], players.homeTeam.length === 2 ? true : false, awayPlayersIds, awayTeamId, score[1], players.awayTeam.length === 2 ? true : false)
    console.log(gameStat)
    this.gamesStats = [...this.gamesStats, gameStat]
  }

  getHomeTeamFromGameStats(gs: GameStats) {
    return this.teamService.getTeamById(gs.homeTeam.teamId);
  }

  getAwayTeamFromGameStats(gs: GameStats) {
    return this.teamService.getTeamById(gs.awayTeam.teamId);
  }

  getHomePlayersFromGameStats(gs: GameStats) {
    let userList = gs.homeTeam.playerIds.map(id => this.userService.getUserById(id))
    userList = userList.length === 1 && gs.homeTeam.multiplayer ? [...userList, null] : [...userList];
    userList = userList.length === 0 && gs.homeTeam.multiplayer ? [null, null] : [...userList];
    userList = userList.length === 0 && !gs.homeTeam.multiplayer ? [null] : [...userList];
    return userList
  }
  getAwayPlayersFromGameStats(gs: GameStats) {
    let userList = gs.awayTeam.playerIds.map(id => this.userService.getUserById(id));
    userList = userList.length === 1 && gs.awayTeam.multiplayer ? [...userList, null] : [...userList];
    userList = userList.length === 0 && gs.awayTeam.multiplayer ? [null, null] : [...userList];
    userList = userList.length === 0 && !gs.awayTeam.multiplayer ? [null] : [...userList];
    return userList;
  }

  getUserResults() {
    let mainUserResults = {
      "win": 0,
      "draw": 0,
      "lose": 0
    }
    console.log(this.gamesStats)
    this.gamesStats.forEach(gameStat => {
      if (gameStat.homeTeam.playerIds.find(id => id === this.authService.getUser().id)) {
        if (gameStat.homeTeam.score > gameStat.awayTeam.score) {
          mainUserResults.win += 1
        } else if (gameStat.homeTeam.score < gameStat.awayTeam.score) {
          mainUserResults.lose += 1
        } else {
          mainUserResults.draw += 1
        }
      } else if (gameStat.awayTeam.playerIds.find(id => id === this.authService.getUser().id)) {
        if (gameStat.homeTeam.score < gameStat.awayTeam.score) {
          mainUserResults.win += 1
        } else if (gameStat.homeTeam.score > gameStat.awayTeam.score) {
          mainUserResults.lose += 1
        } else {
          mainUserResults.draw += 1
        }
      }
    })
    mainUserResults.win = parseFloat((mainUserResults.win/this.gamesStats.length).toFixed(2));
    mainUserResults.draw = parseFloat((mainUserResults.draw/this.gamesStats.length).toFixed(2));
    mainUserResults.lose = parseFloat((mainUserResults.lose/this.gamesStats.length).toFixed(2));
    return mainUserResults;

  }
}
