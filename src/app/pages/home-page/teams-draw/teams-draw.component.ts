import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/shared/team.model';
import { TeamPlayers } from 'src/app/shared/teamplayers.model';
// import teams_data from '../../../../assets/teams_data/teams_data.json'
@Component({
  selector: 'app-teams-draw',
  templateUrl: './teams-draw.component.html',
  styleUrls: ['./teams-draw.component.css']
})
export class TeamsDrawComponent implements OnInit {
  teams_data: Team[]=[];
  current_teamA: Team;
  // current_teamB_name: string = "Real Madrid";
  // current_teamB_img: Team = teams_data[1].image_path;
  current_teamB: Team;
  currentPlayers: string[];
  teamPlayers: TeamPlayers = new TeamPlayers([], [])
  nationalTeams = false;
  syncStars:boolean = false;
  saveCouples:boolean = false;
  
  constructor(private teamService: TeamService) {
    this.teams_data= teamService.getTeams();
    this.current_teamA= new Team(this.teams_data[0].name,this.teams_data[0].league,this.teams_data[0].rank,this.teams_data[0].image_path, this.teams_data[0].type)
    this.current_teamB= new Team(this.teams_data[1].name,this.teams_data[1].league,this.teams_data[1].rank,this.teams_data[1].image_path, this.teams_data[1].type)
   }

  ngOnInit(): void {
  }

  onTeamAStarClicked(starLevel: string) {
    console.log("a" + starLevel)
    this.teamService.teamA_level = starLevel;
    if (this.syncStars) {
      this.teamService.teamB_level = starLevel;
    }
    this.teamService.teamA_changed.next(true)
    this.teamService.teamB_changed.next(true)
  }
  onTeamBStarClicked(starLevel: string) {
    console.log("b" + starLevel)
    this.teamService.teamB_level = starLevel;
    if (this.syncStars) {
      this.teamService.teamA_level = starLevel;
    }
    this.teamService.teamA_changed.next(true)
    this.teamService.teamB_changed.next(true)
  }

  private sleep(milliseconds) {
    return new Promise(
      resolve => setTimeout(resolve, milliseconds)
    );
  }

  private playersDraw() {
    if (!this.saveCouples) {
      let players = this.currentPlayers.slice();
      let random_indexA = Math.floor(Math.random() * players.length);
      this.teamPlayers.homeTeam = [this.currentPlayers[random_indexA]]
      players.splice(random_indexA, 1)
      if (this.currentPlayers.length >= 3) {
        let couple_in_homeTeam = true;
        if (this.currentPlayers.length === 3) {
          let random_index = Math.floor(Math.random() * 2);
          if (random_index === 1) {
            couple_in_homeTeam = false;
          }
        }
        if (couple_in_homeTeam) {
          let random_indexB = Math.floor(Math.random() * players.length);
          this.teamPlayers.homeTeam.push(players[random_indexB])
          players.splice(random_indexB, 1)
        }
      }
      this.teamPlayers.awayTeam = players;
    } else {
      let current_couples = [this.teamPlayers.homeTeam, this.teamPlayers.awayTeam]
      console.log(current_couples) 
      let random_index = Math.floor(Math.random() * 2);
      if (random_index === 1) {
        this.teamPlayers.homeTeam= current_couples[1]
        this.teamPlayers.awayTeam= current_couples[0]
      } 
      // this.teamPlayers.homeTeam.push(players[random_indexB])
    }
  }

  async onDrawClick() {
    console.log(this.syncStars)
    for (let i = 0; i < 20; i++) {
      let teams: Team[] = this.teamService.onDraw()
      this.current_teamA = teams[0]
      this.current_teamB = teams[1]
      if (this.currentPlayers.length !== 0) {
        this.playersDraw()
      }
      await this.sleep(50)
    }
  }

  onPlayersChange(players: string[]) {
    this.currentPlayers = players;
    this.teamPlayers.awayTeam = players.filter(function (value, index) { return index % 2 == 1 })
    this.teamPlayers.homeTeam = players.filter(function (value, index) { return index % 2 == 0 })
    // this.teamPlayers.homeTeam = players.slice(0, 2)
  }

  onNationalClick() {

  }

  onSyncStarsClick() {
    this.syncStars = this.syncStars ? false : true;
    // this.syncStars = !this.syncStars;
    this.teamService.teamB_level = this.teamService.teamA_level;
    if (this.syncStars) {
      this.teamService.teamA_changed.next(true)
      this.teamService.teamB_changed.next(true)
    }
  }
  onSaveCouplesClick() {
    this.saveCouples = this.saveCouples ? false : true;
  }
}
