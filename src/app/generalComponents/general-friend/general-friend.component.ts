import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-general-friend',
  templateUrl: './general-friend.component.html',
  styleUrls: ['./general-friend.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralFriendComponent implements OnInit {
  @Input() name: string;
  @Input() friendRequest: boolean=false;
  @Input() friendRequestPending: boolean=false;
  hover:boolean;
  @Output() removeClicked= new EventEmitter<boolean>();
  @Output() approveClicked= new EventEmitter<boolean>();
  @Output() declineClicked= new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  
  onRemove() {
    this.removeClicked.emit(true);
  }

  onApprove() {
    this.approveClicked.emit(true);
  }
  onDecline() {
    this.declineClicked.emit(true);
  }

} 
