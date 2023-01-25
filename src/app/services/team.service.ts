import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import teams_json from "../../assets/teams_data/teams_data.json"
import { Team } from '../shared/team.model';
import { TeamsData } from '../shared/teamsData.model';
import * as MatcherConstants from "src/app/shared/matcher.constants"
import { catchError, map } from 'rxjs/operators';

interface teamResponse {
  "id": number,
  "name": string,
  "country": string,
  "league": string,
  "rating": number,
  "emblem_path": string
}

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
  teamA_level = "4_stars";
  teamB_level = "4_stars";
  // teams_data: {"clubs": Team[]}= teams_json;
  teams_data: TeamsData;
  clubsDraw: boolean = true;

  static_teams_list = [{
    id: 1,
    name: "Manchester City",
    country: "ENGLAND",
    league: "PREMIER LEAGUE",
    rating: 5,
    emblem_path: "https://futhead.cursecdn.com/static/img/23/clubs/10.png"
  },
  {
    id: 2,
    name: "Liverpool",
    country: "ENGLAND",
    league: "PREMIER LEAGUE",
    rating: 5,
    emblem_path: "https://futhead.cursecdn.com/static/img/23/clubs/9.png"
  }];
  
  // current_teamA= new Team(teams_json[0].name,teams_json[0].league,teams_json[0].rank,teams_json[0].image_path,teams_json[0].type, teams_json[0].id);
  current_teamA= new Team(this.static_teams_list[0].id,this.static_teams_list[0].name,this.static_teams_list[0].country,this.static_teams_list[0].league,this.static_teams_list[0].rating,this.static_teams_list[0].emblem_path);
  subjectTeamA = new BehaviorSubject<Team>(this.current_teamA);
  teamA$: Observable<Team> = this.subjectTeamA.asObservable();
  loadTeamA(team:Team) {
    this.subjectTeamA.next(team);
  }
  getTeamA() {
    return this.subjectTeamA.getValue()
  }
  
  
  // current_teamB= new Team(teams_json[1].name,teams_json[1].league,teams_json[1].rank,teams_json[1].image_path, teams_json[1].type, teams_json[1].id);
  current_teamB= new Team(this.static_teams_list[1].id,this.static_teams_list[1].name,this.static_teams_list[1].country,this.static_teams_list[1].league,this.static_teams_list[1].rating,this.static_teams_list[1].emblem_path);
  subjectTeamB = new BehaviorSubject<Team>(this.current_teamB);
  teamB$: Observable<Team> = this.subjectTeamB.asObservable();
  loadTeamB(team:Team) {
    this.subjectTeamB.next(team);
  }
  getTeamB() {
    return this.subjectTeamB.getValue()
  }
  constructor(private http: HttpClient) {
    // let team: Team;
    // let clubs_5: Team[] = [];
    // let clubs_4_5: Team[] = [];
    // let clubs_4: Team[] = [];
    // let clubs_3_5: Team[] = [];
    // let national_5: Team[] = [];
    // let national_4_5: Team[] = [];
    // let national_4: Team[] = [];
    // let national_3_5: Team[] = [];

    // teams_json.forEach(team_data => {
    //   team = new Team(team_data.name, team_data.league, team_data.rank, team_data.image_path, team_data.type, team_data.id)
    //   if (team.type === 'club') {
    //     switch (team.rank) {
    //       case 5:
    //         clubs_5 = [...clubs_5, team];
    //         break;
    //       case 4.5:
    //         clubs_4_5 = [...clubs_4_5, team];
    //         // clubs_4_5.push(team);
    //         break;
    //       case 4:
    //         clubs_4 = [...clubs_4, team];
    //         // clubs_4.push(team);
    //         break;
    //       case 3.5:
    //         clubs_3_5 = [...clubs_3_5, team];
    //       // clubs_3_5.push(team);
    //     }
    //   } else if (team.type === 'national') {
    //     switch (team.rank) {
    //       case 5:
    //         national_5 = [...national_5, team];
    //         // national_5.push(team);
    //         break;
    //       case 4.5:
    //         national_4_5 = [...national_4_5, team];
    //         // national_4_5.push(team);
    //         break;
    //       case 4:
    //         national_4 = [...national_4, team];
    //         // national_4.push(team);
    //         break;
    //       case 3.5:
    //         national_3_5 = [...national_3_5, team];
    //         // national_3_5.push(team);
    //     }
    //   }
    // });
    // this.teams_data = new TeamsData(clubs_5, clubs_4_5, clubs_4, clubs_3_5, national_5, national_4_5, national_4, national_3_5)
    // console.log(this.teams_data)
  }

  public onDraw() {
    let random_indexA: number, new_teamA: Team;
    console.log(this.teams_data);
    random_indexA = this.clubsDraw ? Math.floor(Math.random() * this.teams_data.clubs[this.teamA_level].length) : Math.floor(Math.random() * this.teams_data.national[this.teamA_level].length);
    new_teamA = this.clubsDraw ? this.teams_data.clubs[this.teamA_level][random_indexA] : this.teams_data.national[this.teamA_level][random_indexA];
    // switch (this.teamA_level) {
      //   case '5_stars':
      //     random_indexA = Math.floor(Math.random() * this.teams_data.clubs['5_stars'].length);
      //     new_teamA = this.teams_data.clubs['5_stars'][random_indexA];
    //     break;
    //   case '4.5_stars':
    //     random_indexA = Math.floor(Math.random() * this.teams_data.clubs['4.5_stars'].length);
    //     new_teamA = this.teams_data.clubs['4.5_stars'][random_indexA];
    //     break;
    //   case '4_stars':
    //     random_indexA = Math.floor(Math.random() * this.teams_data.clubs['4_stars'].length);
    //     new_teamA = this.teams_data.clubs['4_stars'][random_indexA];
    //     break;
    //   case '3.5_stars':
    //     random_indexA = Math.floor(Math.random() * this.teams_data.clubs['3.5_stars'].length);
    //     new_teamA = this.teams_data.clubs['3.5_stars'][random_indexA]
    // }
    let random_indexB: number, new_teamB: Team;
    random_indexB = this.clubsDraw ? Math.floor(Math.random() * this.teams_data.clubs[this.teamB_level].length) : Math.floor(Math.random() * this.teams_data.national[this.teamB_level].length);
    new_teamB = this.clubsDraw ? this.teams_data.clubs[this.teamB_level][random_indexB] : this.teams_data.national[this.teamB_level][random_indexB];
    // switch (this.teamB_level) {
    //   case '5_stars':
    //     random_indexB = Math.floor(Math.random() * this.teams_data.clubs['5_stars'].length);
    //     new_teamB = this.teams_data.clubs['5_stars'][random_indexB];
    //     break;
    //   case '4.5_stars':
    //     random_indexB = Math.floor(Math.random() * this.teams_data.clubs['4.5_stars'].length);
    //     new_teamB = this.teams_data.clubs['4.5_stars'][random_indexB];
    //     break;
    //   case '4_stars':
    //     random_indexB = Math.floor(Math.random() * this.teams_data.clubs['4_stars'].length);
    //     new_teamB = this.teams_data.clubs['4_stars'][random_indexB];
    //     break;
    //   case '3.5_stars':
    //     random_indexB = Math.floor(Math.random() * this.teams_data.clubs['3.5_stars'].length);
    //     new_teamB = this.teams_data.clubs['3.5_stars'][random_indexB];
    // }
    return [new_teamA, new_teamB];
  }

  public getTeams() {
    // return teams_json;
    return this.static_teams_list;
  }

  public getTeamById(id: number) {
    let team: Team;
    team = this.teams_data.clubs['3.5_stars'].find(team => id === team.id);
    if (team) {
      return team;
    }
    team = this.teams_data.clubs['4_stars'].find(team => id === team.id);
    if (team) {
      return team;
    }
    team = this.teams_data.clubs['4.5_stars'].find(team => id === team.id);
    if (team) {
      return team;
    }
    team = this.teams_data.clubs['5_stars'].find(team => id === team.id);
    if (team) {
      return team;
    }
    team = this.teams_data.national['3.5_stars'].find(team => id === team.id);
    if (team) {
      return team;
    }
    team = this.teams_data.national['4_stars'].find(team => id === team.id);
    if (team) {
      return team;
    }
    team = this.teams_data.national['4.5_stars'].find(team => id === team.id);
    if (team) {
      return team;
    }
    team = this.teams_data.national['5_stars'].find(team => id === team.id);
    if (team) {
      return team;
    }
    return null;
  }

  public saveStaticTeamsList(teams_list) {
    const teams_ratings_data = teams_list.reduce((acc, item, idx)=>{
      let current_team = new Team(item.id, item.name, item.country, item.league, item.rating, item.emblem_path)
      console.log(current_team);
      switch (current_team.rating) {
        case 5:
          current_team.country === MatcherConstants.TEAM_INTERNATIONAL_COUNTRY ? acc.national_5.push(current_team) : acc.clubs_5.push(current_team);
          break;
        case 4.5:
          current_team.country === MatcherConstants.TEAM_INTERNATIONAL_COUNTRY ? acc.national_4_5.push(current_team) : acc.clubs_4_5.push(current_team);
          break;
        case 4:
          current_team.country === MatcherConstants.TEAM_INTERNATIONAL_COUNTRY ? acc.national_4.push(current_team) : acc.clubs_4.push(current_team);
          break;
        case 3.5:
          current_team.country === MatcherConstants.TEAM_INTERNATIONAL_COUNTRY ? acc.national_3_5.push(current_team) : acc.clubs_3_5.push(current_team);
      }
      return acc
    },{
      clubs_5: [],
      clubs_4_5: [],
      clubs_4: [],
      clubs_3_5: [],
      national_5: [],
      national_4_5: [],
      national_4: [],
      national_3_5: [],
    })
    this.teams_data = new TeamsData(teams_ratings_data.clubs_5, teams_ratings_data.clubs_4_5, teams_ratings_data.clubs_4, teams_ratings_data.clubs_3_5, teams_ratings_data.national_5, teams_ratings_data.national_4_5, teams_ratings_data.national_4, teams_ratings_data.national_3_5);
  }

  public getTeamsList() {
    return this.http.get<[teamResponse]>(MatcherConstants.BACKEND_URL, {}).pipe(map(teams_list_response => {
      console.log(teams_list_response);
      this.saveStaticTeamsList(teams_list_response)
      // team = new Team(team_data.name, team_data.league, team_data.rank, team_data.image_path, team_data.type, team_data.id)
    //   if (team.type === 'club') {
    //     switch (team.rank) {
    //       case 5:
    //         clubs_5 = [...clubs_5, team];
    //         break;
    //       case 4.5:
    //         clubs_4_5 = [...clubs_4_5, team];
    //         // clubs_4_5.push(team);
    //         break;
    //       case 4:
    //         clubs_4 = [...clubs_4, team];
    //         // clubs_4.push(team);
    //         break;
    //       case 3.5:
    //         clubs_3_5 = [...clubs_3_5, team];
    //       // clubs_3_5.push(team);
    //     }
    //   } else if (team.type === 'national') {
    //     switch (team.rank) {
    //       case 5:
    //         national_5 = [...national_5, team];
    //         // national_5.push(team);
    //         break;
    //       case 4.5:
    //         national_4_5 = [...national_4_5, team];
    //         // national_4_5.push(team);
    //         break;
    //       case 4:
    //         national_4 = [...national_4, team];
    //         // national_4.push(team);
    //         break;
    //       case 3.5:
    //         national_3_5 = [...national_3_5, team];
    //         // national_3_5.push(team);
    //     }
    //   }
    // });
    // this.teams_data = new TeamsData(clubs_5, clubs_4_5, clubs_4, clubs_3_5, national_5, national_4_5, national_4, national_3_5)
    // console.log(this.teams_data)
      return teams_list_response;
    }), catchError(error => {
      console.log(error);
      return error;
    }))
  }

  
}
