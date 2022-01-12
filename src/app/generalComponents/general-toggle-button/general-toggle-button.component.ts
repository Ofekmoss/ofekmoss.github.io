import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-general-toggle-button',
  templateUrl: './general-toggle-button.component.html',
  styleUrls: ['./general-toggle-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralToggleButtonComponent implements OnInit {
  @Input() text: string;
  @Input() checked: boolean=true;
  @Output() buttonClicked= new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  onToggleButtonClicked() {
    this.buttonClicked.emit(true);
  }
}
