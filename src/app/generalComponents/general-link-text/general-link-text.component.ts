import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-link-text',
  templateUrl: './general-link-text.component.html',
  styleUrls: ['./general-link-text.component.css']
})
export class GeneralLinkTextComponent implements OnInit {
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
