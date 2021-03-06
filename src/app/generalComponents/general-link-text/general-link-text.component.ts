import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-link-text',
  templateUrl: './general-link-text.component.html',
  styleUrls: ['./general-link-text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralLinkTextComponent implements OnInit {
  @Input() text: string;
  @Input() custom_style= null;

  constructor() { }

  ngOnInit(): void {
  }
}
