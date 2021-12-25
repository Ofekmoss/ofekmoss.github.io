import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/shared/team.model';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  // @Input() teamA: boolean=true;
  @Input('team') current_team: Team;
  // teams_img_path: string = "src/app/images/"
  // current_team_name: string= this.teamA ? this.teamService.current_teamA_name : this.teamService.current_teamB_name;
  // current_team_img: string=this.teamA ? this.teamService.current_teamA_img : this.teamService.current_teamB_img;
  // this.current_team_name= this.teamA ? this.teamService.current_teamA_name : this.teamService.current_teamB_name
  // this.current_team_img= this.teamA ? this.teamService.current_teamA_img : this.teamService.current_teamB_img
  constructor(private teamService: TeamService) {
  }
  
  ngOnInit(): void {
    console.log(this.current_team)
    // this.current_team_name= this.teamA ? this.teamService.current_teamA_name : this.teamService.current_teamB_name;
    // this.current_team_img=this.teamA ? this.teamService.current_teamA_img : this.teamService.current_teamB_img;
  }

}