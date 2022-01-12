import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TeamPlayers } from 'src/app/shared/teamplayers.model';
import { Chip } from 'src/app/shared/chip.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipsInputComponent implements OnInit {
  @Input() title: string;
  @Input() placeHolder: string;
  @Input() limit: number;
  @Input() items: Chip[]=[];
  @Input() colors: { 'home_team': string[], 'away_team': string[] } = null;
  @Input('suggestedItems') allItems: string[] = [];
  @Input() itemsSide: TeamPlayers;
  @Output() currentItems = new EventEmitter<Chip[]>();
  @Output() friendItemRemoved = new EventEmitter<Chip>();

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl()
  filteredItems: Observable<string[]>;
  // items: string[] = [];

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;

  constructor(private cd:ChangeDetectorRef, private userService: UserService) {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => (item ? this._filter(item) : this.allItems.slice())),
    );
  }
  ngOnInit(): void {
    // this.items = this.items.concat(this.currentChips);
    // this.currentItems.emit(this.items)
    // console.log(this.currentChips)
  }
  // ngOnChanges(changes: SimpleChange) {
  //   // if (changes)
  //   console.log(changes) 
  // }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      // this.items.push(new Chip(value,false));
      this.items.push(new Chip(null,false, value));
    }

    // Clear the input value
    event.chipInput!.clear();

    this.itemCtrl.setValue(null);
    this.currentItems.emit(this.items)
  }

  onItemRemoved(index: number): void {
    console.log(index)
    // const index = this.items.map(x => this.userService.getUserById(x.userId).username).indexOf(item);
    if (index >= 0) {
      let deletedItem= this.items.splice(index, 1);
      console.log(deletedItem) 
      deletedItem[0].friend ? this.friendItemRemoved.emit(deletedItem[0]) : console.log('not friend');
    }
    this.currentItems.emit(this.items)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.items.push(new Chip(event.option.viewValue,false));
    this.items.push(new Chip(null,false));
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
    this.currentItems.emit(this.items)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allItems.filter(item => item.toLowerCase().includes(filterValue));
  }
}
