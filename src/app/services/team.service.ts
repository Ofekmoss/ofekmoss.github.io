import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import teams_json from "../../assets/teams_data/teams_data.json"
import { Team } from '../shared/team.model';
import { TeamsData } from '../shared/teamsData.model';
import * as MatcherConstants from "src/app/shared/matcher.constants"
import { catchError, map } from 'rxjs/operators';


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
  teamA_level = "3.5_stars";
  teamB_level = "3.5_stars";
  // teams_data: {"clubs": Team[]}= teams_json;
  teams_data: TeamsData;
  
  current_teamA= new Team(teams_json[0].name,teams_json[0].league,teams_json[0].rank,teams_json[0].image_path,teams_json[0].type, teams_json[0].id);
  subjectTeamA = new BehaviorSubject<Team>(this.current_teamA);
  teamA$: Observable<Team> = this.subjectTeamA.asObservable();
  loadTeamA(team:Team) {
    this.subjectTeamA.next(team);
  }
  getTeamA() {
    return this.subjectTeamA.getValue()
  }
  
  
  current_teamB= new Team(teams_json[1].name,teams_json[1].league,teams_json[1].rank,teams_json[1].image_path, teams_json[1].type, teams_json[1].id);
  subjectTeamB = new BehaviorSubject<Team>(this.current_teamB);
  teamB$: Observable<Team> = this.subjectTeamB.asObservable();
  loadTeamB(team:Team) {
    this.subjectTeamB.next(team);
  }
  getTeamB() {
    return this.subjectTeamB.getValue()
  }
  constructor(private http: HttpClient) {
    let team: Team;
    let clubs_5: Team[] = [];
    let clubs_4_5: Team[] = [];
    let clubs_4: Team[] = [];
    let clubs_3_5: Team[] = [];
    let national_5: Team[] = [];
    let national_4_5: Team[] = [];
    let national_4: Team[] = [];
    let national_3_5: Team[] = [];

    teams_json.forEach(team_data => {
      team = new Team(team_data.name, team_data.league, team_data.rank, team_data.image_path, team_data.type, team_data.id)
      if (team.type === 'club') {
        switch (team.rank) {
          case 5:
            clubs_5 = [...clubs_5, team];
            break;
          case 4.5:
            clubs_4_5 = [...clubs_4_5, team];
            // clubs_4_5.push(team);
            break;
          case 4:
            clubs_4 = [...clubs_4, team];
            // clubs_4.push(team);
            break;
          case 3.5:
            clubs_3_5 = [...clubs_3_5, team];
          // clubs_3_5.push(team);
        }
      } else if (team.type === 'national') {
        switch (team.rank) {
          case 5:
            national_5 = [...national_5, team];
            // national_5.push(team);
            break;
          case 4.5:
            national_4_5 = [...national_4_5, team];
            // national_4_5.push(team);
            break;
          case 4:
            national_4 = [...national_4, team];
            // national_4.push(team);
            break;
          case 3.5:
            national_3_5 = [...national_3_5, team];
            // national_3_5.push(team);
        }
      }
    });
    this.teams_data = new TeamsData(clubs_5, clubs_4_5, clubs_4, clubs_3_5, national_5, national_4_5, national_4, national_3_5)
    console.log(this.teams_data)
  }

  public onDraw() {
    let random_indexA: number, new_teamA: Team;
    switch (this.teamA_level) {
      case '5_stars':
        random_indexA = Math.floor(Math.random() * this.teams_data.clubs['5_stars'].length);
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
        new_teamA = this.teams_data.clubs['3.5_stars'][random_indexA]
        // console.log(current_teamA) 
        // new_teamA = new Team(current_teamA.name, current_teamA.league, current_teamA.rank, current_teamA.image_path, current_teamA.type);
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


  public getTeams_fromBE() {
    return this.http.get(MatcherConstants.BACKEND_URL, {}).pipe(map(responseData => {
      console.log(responseData)
      return responseData
    }), catchError(error => {
      console.log(error)
      return error
    }))
  }
}
