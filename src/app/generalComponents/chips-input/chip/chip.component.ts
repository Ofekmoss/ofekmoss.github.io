import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent implements OnInit {
  @Output() itemRemoved = new EventEmitter<number>();
  @Input() item: string;
  @Input() index: number;
  @Input() removable: boolean=true;
  @Input() backgroundColor: string= 'none';
  selectable = true;
  constructor() { }

  ngOnInit(): void {
  }

  remove(index: number) {
    console.log(index)
    this.itemRemoved.emit(index)
  }
}
