import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
//   template: `<div>
//   <label>{{label}} :</label>
//   <input [formControl]="formGroup.controls[label]">
// </div>`,
  styleUrls: ['./input.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
  @Input() placeHolder: string;
  @Input() label: string;
  @Input() type: string= 'text';
  @Input() controlName: string;
  @Input() custom_style= null;

  constructor() { }

  ngOnInit(): void {
  }

}
