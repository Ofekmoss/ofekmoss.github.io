import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, OnDestroy {
  teamSub: Subscription;
  constructor(private teamService: TeamService) { }


  ngOnInit(): void {
    this.firstTeamLoad();
  }
  
  firstTeamLoad() {
    this.teamSub = this.teamService.getTeamsList().subscribe(response => {
      
      console.log(response);
    });
  }

  ngOnDestroy(): void {
    this.teamSub.unsubscribe();
  }
}
