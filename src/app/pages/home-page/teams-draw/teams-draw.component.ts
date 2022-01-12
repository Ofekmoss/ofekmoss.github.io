import { ChangeDetectionStrategy, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { async } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { GameStatsService } from 'src/app/services/game-stats.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { Chip } from 'src/app/shared/chip.model';
import { Team } from 'src/app/shared/team.model';
import { TeamPlayers } from 'src/app/shared/teamplayers.model';
import { User } from 'src/app/shared/user.model';
// import teams_data from '../../../../assets/teams_data/teams_data.json'
@Component({
  selector: 'app-teams-draw',
  templateUrl: './teams-draw.component.html',
  styleUrls: ['./teams-draw.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsDrawComponent implements OnInit {
  openDialog: boolean = false;
  drawBeforeDialogOpen: boolean= false;
  teams_data: Team[]=[];
  current_teamA: Team;
  // current_teamB_name: string = "Real Madrid";
  // current_teamB_img: Team = teams_data[1].image_path;
  current_teamB: Team;
  currentPlayers: Chip[]=[];
  teamPlayers: TeamPlayers = new TeamPlayers([], [])
  nationalTeams = false;
  syncStars:boolean = false;
  saveCouples:boolean = false;
  currentChips: Chip[]=[];
  userFriends: User[];
  guestUser: boolean;
  
  constructor(private teamService: TeamService, private userService: UserService, private authService: AuthService, private gameStatsService: GameStatsService) {
    this.teams_data= teamService.getTeams();
    this.current_teamA= new Team(this.teams_data[0].name,this.teams_data[0].league,this.teams_data[0].rank,this.teams_data[0].image_path, this.teams_data[0].type, this.teams_data[0].id)
    this.current_teamB= new Team(this.teams_data[1].name,this.teams_data[1].league,this.teams_data[1].rank,this.teams_data[1].image_path, this.teams_data[1].type, this.teams_data[1].id)
   }

   ngOnInit(): void {
    this.guestUser = this.authService.checkIfGuest();
    if (!this.guestUser) {
      this.userFriends = this.userService.userFriends;
      const user = this.authService.getUser();
      user ? this.currentChips.push(new Chip(user.id,false)) : console.log('guest');
      this.currentPlayers = [...this.currentPlayers, new Chip(user.id, false)]
      this.onPlayersChange(this.currentPlayers)
    }
  }

  onAddFriendClick(friendIndex: number) {
    // this.currentChips.push(this.userService.userFriends[friendIndex].username)
    let chip = new Chip(this.userFriends[friendIndex].id, true)
    this.currentChips = [...this.currentChips, chip]
    console.log(this.currentChips)
    this.currentPlayers = [...this.currentPlayers, chip]
    this.onPlayersChange(this.currentPlayers)
    this.userFriends.splice(friendIndex,1)
  }

  onTeamAStarClicked(starLevel: string) {
    this.checkIfOpenDialog()
    console.log("a" + starLevel)
    this.teamService.teamA_level = starLevel;
    if (this.syncStars) {
      this.teamService.teamB_level = starLevel;
    }
    this.teamService.teamA_changed.next(true)
    this.teamService.teamB_changed.next(true)
  }
  onTeamBStarClicked(starLevel: string) {
    this.checkIfOpenDialog()
    console.log("b" + starLevel)
    this.teamService.teamB_level = starLevel;
    if (this.syncStars) {
      this.teamService.teamA_level = starLevel;
    }
    this.teamService.teamA_changed.next(true)
    this.teamService.teamB_changed.next(true)
  }
  private checkIfOpenDialog() {
    if (this.drawBeforeDialogOpen) {
      this.openDialog = true;
      this.drawBeforeDialogOpen = false;
    } 
    return this.openDialog
  }
  private sleep(milliseconds) {
    return new Promise(
      resolve => setTimeout(resolve, milliseconds)
    );
  }

  private playersDraw() {
    let friendsChips = this.currentPlayers.find(x => x.friend ? true : false)
    let mainUserChip = this.currentPlayers.find(x => x.userId === this.authService.getUser().id ? true : false)
    if (friendsChips && mainUserChip) {
      this.drawBeforeDialogOpen = true;
    }
    // let playersNames = this.currentPlayers.map(x => this.userService.getUserById(x.userId) ? this.userService.getUserById(x.userId).username : x.friendName)
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
        this.teamPlayers.homeTeam = current_couples[1]
        this.teamPlayers.awayTeam = current_couples[0]
      } 
      // this.teamPlayers.homeTeam.push(players[random_indexB])
    }
  }

  async onDrawClick() {
    if (!this.checkIfOpenDialog()) {
      for (let i = 0; i < 20; i++) {
        let teams: Team[] = this.teamService.onDraw()
        // console.log(teams);
        let current_team = teams[0]
        // console.log(current_team);
        // this.current_teamA = new Team(current_team.name, current_team.league, current_team.rank, current_team.image_path, current_team.type);;
        this.teamService.loadTeamA(new Team(current_team.name, current_team.league, current_team.rank, current_team.image_path, current_team.type, current_team.id))
        current_team = teams[1]
        // console.log(current_team);
        this.teamService.loadTeamB(new Team(current_team.name, current_team.league, current_team.rank, current_team.image_path, current_team.type, current_team.id))
        this.current_teamB = teams[1];
        // console.log('team service on draw');
        if (this.currentPlayers.length !== 0) {
          this.playersDraw();
        }
        await this.sleep(50);
        // await this.sleep(1000);
      }
    }
  }

  onPlayersChange(players: Chip[]) {
    // console.log(players)
    this.checkIfOpenDialog()
    // let playersNames = players.map(x => this.userService.getUserById(x.userId) ? this.userService.getUserById(x.userId).username : x.friendName)
    // let playersIds = players.map(x => x.userId ? x.userId : x.friendName)
    this.currentPlayers = players;
    // this.teamPlayers.awayTeamUserIds = playersNames.filter(function (value, index) { return index % 2 == 1 })
    this.teamPlayers.awayTeam = this.currentChips.filter(function (value, index) { return index % 2 == 1 })
    this.teamPlayers.homeTeam = this.currentChips.filter(function (value, index) { return index % 2 == 0 })
    // this.teamPlayers.homeTeam = players.slice(0, 2)
  }

  onFriendChipRemoved(friendChip: Chip) {
    this.checkIfOpenDialog()
    this.userFriends = [...this.userFriends, this.userService.getUserById(friendChip.userId)]
    console.log(this.userFriends)
  }

  onNationalClick() {
    this.checkIfOpenDialog()
  }

  onSyncStarsClick() {
    this.checkIfOpenDialog()
    this.syncStars = this.syncStars ? false : true;
    // this.syncStars = !this.syncStars;
    this.teamService.teamB_level = this.teamService.teamA_level;
    if (this.syncStars) {
      this.teamService.teamA_changed.next(true)
      this.teamService.teamB_changed.next(true)
    }
  }
  onSaveCouplesClick() {
    this.checkIfOpenDialog()
    this.saveCouples = this.saveCouples ? false : true;
  }
  onDialogClosed(data: number[]) {
    if (data) {
      console.log(data)
      console.log('data')
      this.gameStatsService.newGameStats(data, this.teamPlayers)
    }
    this.drawBeforeDialogOpen = false;
    this.openDialog = false
  }
}
