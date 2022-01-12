import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/shared/team.model';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamDetailsComponent implements OnInit {
  @Input() id: string;
  @Input() teamInDraw: boolean=false;
  @Input() team: Team;

  // @Input('team') current_team: Team;
  team$: Observable<Team>;
  // teams_img_path: string = "src/app/images/"
  // current_team_name: string= this.teamA ? this.teamService.current_teamA_name : this.teamService.current_teamB_name;
  // current_team_img: string=this.teamA ? this.teamService.current_teamA_img : this.teamService.current_teamB_img;
  // this.current_team_name= this.teamA ? this.teamService.current_teamA_name : this.teamService.current_teamB_name
  // this.current_team_img= this.teamA ? this.teamService.current_teamA_img : this.teamService.current_teamB_img
  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    if (this.id === 'homeTeam') {
      this.teamService.teamA$.subscribe(
        team => {
          this.team$ = this.teamService.teamA$;
        }
      )
    } else if (this.id === 'awayTeam'){
      this.teamService.teamB$.subscribe(
        team => {
          this.team$ = this.teamService.teamB$;
        }
      )

    }

    // this.current_team_name= this.teamA ? this.teamService.current_teamA_name : this.teamService.current_teamB_name;
    // this.current_team_img=this.teamA ? this.teamService.current_teamA_img : this.teamService.current_teamB_img;
  }

}