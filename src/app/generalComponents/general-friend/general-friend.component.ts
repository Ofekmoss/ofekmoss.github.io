import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-general-friend',
  templateUrl: './general-friend.component.html',
  styleUrls: ['./general-friend.component.css']
})
export class GeneralFriendComponent implements OnInit {
  @Input() name: string;
  hover:boolean;
  @Output() removeClicked= new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  
  onRemove() {
    this.removeClicked.emit(true);
  }

} 
