import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/user.model';


@Component({
  selector: 'app-general-dropdown-menu',
  templateUrl: './general-dropdown-menu.component.html',
  styleUrls: ['./general-dropdown-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralDropdownMenuComponent implements OnInit {
  @Input() text: string;
  @Input() optionList: User[];
  @Input() disabled: boolean;
  @Output() optionClicked= new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.optionList)
  }

  onOptionClick(index: number) {
    this.optionClicked.emit(index)
  }
}
