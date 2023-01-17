import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  constructor(private teamService: TeamService) { }
  

  ngOnInit(): void {
    this.teamService.getTeams_fromBE().subscribe(response => {
      console.log(response);
    });
  }
}
