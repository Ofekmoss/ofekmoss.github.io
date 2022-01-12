import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-fontawesome-icon',
  templateUrl: './general-fontawesome-icon.component.html',
  styleUrls: ['./general-fontawesome-icon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralFontawesomeIconComponent implements OnInit {
  @Input() iconClassName: string;
  @Input() hoverColor: string;
  @Input() custom_style= null;
  hover: boolean;


  constructor() { }

  ngOnInit(): void {
  }

}
