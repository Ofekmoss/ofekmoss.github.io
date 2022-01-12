import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.css']
})
export class GeneralDialogComponent implements OnInit {
  @Output() dialogData= new EventEmitter<number[]>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      // data: {input1: this.input1, input2: this.input2},
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.dialogData.emit(result)
    });
  }

}
