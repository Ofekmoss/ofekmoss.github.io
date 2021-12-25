import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TeamPlayers } from 'src/app/shared/teamplayers.model';

@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.css']
})
export class ChipsInputComponent implements OnInit {
  @Input() title: string;
  @Input() placeHolder: string;
  @Input() limit: number;
  @Input() colors: { 'home_team': string[], 'away_team': string[] } = null;
  @Input('suggestedItems') allItems: string[] = [];
  @Input() itemsSide: TeamPlayers;
  @Output() currentItems = new EventEmitter<string[]>();

  
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl()
  filteredItems: Observable<string[]>;
  items: string[] = [];

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => (item ? this._filter(item) : this.allItems.slice())),
    );
  }
  ngOnInit(): void {
    localStorage.getItem("activeUsername") !== null ? this.items.push(localStorage.getItem("activeUsername")) : console.log('guest');
    this.currentItems.emit(this.items)
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.items.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.itemCtrl.setValue(null);
    this.currentItems.emit(this.items)
  }

  onItemRemoved(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
    this.currentItems.emit(this.items)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.items.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
    this.currentItems.emit(this.items)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allItems.filter(item => item.toLowerCase().includes(filterValue));
  }
}
