import { Injectable } from '@angular/core';
import { Chip } from '../shared/chip.model';
import { GameStats } from '../shared/gameStats.model';
import { Team } from '../shared/team.model';
import { TeamPlayers } from '../shared/teamplayers.model';
import { User } from '../shared/user.model';
import { TeamService } from './team.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameStatsService {
  gamesStats: GameStats[] = [];
  constructor(private teamService: TeamService, private userService: UserService) {
    this.gamesStats = [...this.gamesStats, new GameStats([179000], 3, 2, true, [userService.userFriends[0].id], 4, 1, false), new GameStats([179000, userService.userFriends[2].id], 1, 2, false, [], 6, 1, true), new GameStats([179000], 2, 12, false, [userService.userFriends[1].id, userService.userFriends[2].id], 7, 18, false)]
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
}
