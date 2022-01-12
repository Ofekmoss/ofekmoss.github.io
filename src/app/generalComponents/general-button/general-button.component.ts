import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-general-button',
  templateUrl: './general-button.component.html',
  styleUrls: ['./general-button.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralButtonComponent implements OnInit {
  @Input() type: String = 'submit';
  @Input() form: FormGroup;
  @Input() text: string;
  @Input() disabled: boolean= false;
  @Output() buttonClicked= new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.form)
    console.log(this.text)

  }


  onButtonClicked() {
    this.buttonClicked.emit(true);
  }

}
