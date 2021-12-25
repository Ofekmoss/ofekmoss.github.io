import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/shared/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @Input() team:Team;
  @Input() id:string;
  @Input() teamPlayers:string[];
  @Output() starLevel= new EventEmitter<string>();
  currentStar: number;
  subscription: Subscription;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    // this.currentStar
    if (this.id === 'awayTeam'){
      this.subscription = this.teamService.teamB_changed.subscribe(
        () => {
          switch (this.teamService.teamB_level) {
            case '3.5_stars': 
              this.currentStar=3.5;
              break;
            case '4_stars': 
              this.currentStar=4;
              break;
            case '4.5_stars': 
              this.currentStar=4.5;
              break;
            case '5_stars': 
              this.currentStar=5;
              break;
          }
          // this.currentStar = this.teamService.teamB_level;
          console.log(this.currentStar)
          console.log(this.teamService.teamA_level)
          console.log(this.teamService.teamB_level)
        } 
      )
    } else if (this.id === 'homeTeam'){
      this.subscription = this.teamService.teamA_changed.subscribe(
        () => {
          switch (this.teamService.teamA_level) {
            case '3.5_stars': 
              this.currentStar=3.5;
              break;
            case '4_stars': 
              this.currentStar=4;
              break;
            case '4.5_stars': 
              this.currentStar=4.5;
              break;
            case '5_stars': 
              this.currentStar=5;
              break;
          }
          // this.currentStar = this.teamService.teamB_level;
          console.log(this.currentStar)
          console.log(this.teamService.teamA_level)
          console.log(this.teamService.teamB_level)
        } 
      )
    }
    
  }

  starClicked(newItem: string) {
    console.log(newItem)
    this.starLevel.emit(newItem)
  }

}
