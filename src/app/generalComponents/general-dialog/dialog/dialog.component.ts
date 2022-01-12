import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GeneralDialogComponent } from '../general-dialog.component';

export interface DialogData {
  input1: number,
  input2: number,
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  homeTeamFormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(30)]);
  awayTeamFormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(30)]);

  constructor(
    public dialogRef: MatDialogRef<GeneralDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
