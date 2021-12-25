import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import teams_json from "../../assets/teams_data/teams_data.json"
import { Team } from '../shared/team.model';
import { TeamsData } from '../shared/teamsData.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  // current_teamA_name: string = "Barcelona";
  // current_teamA_img: string = teams_data['5_stars'].Barcelona;
  // current_teamB_name: string = "Dortmund";
  // current_teamB_img: string = teams_data['5_stars'].Dortmund;
  teamsChanged = new Subject<Team[]>();
  teamA_changed = new Subject<boolean>()
  teamB_changed = new Subject<boolean>()
  teamA_level= "3.5_stars";
  teamB_level= "3.5_stars";
  // teams_data: {"clubs": Team[]}= teams_json;
  clubs_5: Team[]=[];
  clubs_4_5: Team[]=[];
  clubs_4: Team[]=[];
  clubs_3_5: Team[]=[];
  national_5: Team[]=[];
  national_4_5: Team[]=[];
  national_4: Team[]=[];
  national_3_5: Team[]=[];
  teams_data:TeamsData;
  clubs= []
  constructor() { 
    let team: Team;
    teams_json.forEach(team_data => {
      team = new Team(team_data.name, team_data.league, team_data.rank, team_data.image_path, team_data.type)
      if (team.type === 'club') {
        switch (team.rank) {
          case 5:
            this.clubs_5.push(team);
            break;
          case 4.5:
            this.clubs_4_5.push(team);
            break;
          case 4:
            this.clubs_4.push(team);
            break;
          case 3.5:
            this.clubs_3_5.push(team);
        }
      } else if (team.type === 'national') {
        switch (team.rank) {
          case 5:
            this.national_5.push(team);
            break;
          case 4.5:
            this.national_4_5.push(team);
            break;
          case 4:
            this.national_4.push(team);
            break;
          case 3.5:
            this.national_3_5.push(team);
        }
      }
    });
    this.teams_data= new TeamsData(this.clubs_5,this.clubs_4_5, this.clubs_4, this.clubs_3_5,this.national_5,this.national_4_5,this.national_4,this.national_3_5) 
    console.log(this.teams_data)
  }

  public onDraw() {
    let random_indexA: number, new_teamA: Team;
    switch (this.teamA_level) {
      case '5_stars':
        random_indexA = Math.floor(Math.random() * this.teams_data.clubs['5_stars'].length);
        console.log(random_indexA)
        new_teamA = this.teams_data.clubs['5_stars'][random_indexA];
        break;
      case '4.5_stars':
        random_indexA = Math.floor(Math.random() * this.teams_data.clubs['4.5_stars'].length);
        new_teamA = this.teams_data.clubs['4.5_stars'][random_indexA];
        break;
      case '4_stars':
        random_indexA = Math.floor(Math.random() * this.teams_data.clubs['4_stars'].length);
        new_teamA = this.teams_data.clubs['4_stars'][random_indexA];
        break;
      case '3.5_stars':
        random_indexA = Math.floor(Math.random() * this.teams_data.clubs['3.5_stars'].length);
        new_teamA = this.teams_data.clubs['3.5_stars'][random_indexA];
    }
    let random_indexB: number, new_teamB: Team;
    switch (this.teamB_level) {
      case '5_stars':
        random_indexB = Math.floor(Math.random() * this.teams_data.clubs['5_stars'].length);
        new_teamB = this.teams_data.clubs['5_stars'][random_indexB];
        break;
      case '4.5_stars':
        random_indexB = Math.floor(Math.random() * this.teams_data.clubs['4.5_stars'].length);
        new_teamB = this.teams_data.clubs['4.5_stars'][random_indexB];
        break;
      case '4_stars':
        random_indexB = Math.floor(Math.random() * this.teams_data.clubs['4_stars'].length);
        new_teamB = this.teams_data.clubs['4_stars'][random_indexB];
        break;
      case '3.5_stars':
        random_indexB = Math.floor(Math.random() * this.teams_data.clubs['3.5_stars'].length);
        new_teamB = this.teams_data.clubs['3.5_stars'][random_indexB];
    }
    return [new_teamA, new_teamB];
  }

  public getTeams() {
    return teams_json;
  }
}
