import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent implements OnInit {
  @Output() itemRemoved = new EventEmitter<string>();
  @Input() item: string;
  @Input() removable: boolean=true;
  @Input() backgroundColor: string= 'none';
  selectable = true;
  constructor() { }

  ngOnInit(): void {
  }

  remove(item: string) {
    console.log(item)
    this.itemRemoved.emit(item)
  }
}
