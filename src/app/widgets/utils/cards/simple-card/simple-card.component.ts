import { Component, Inject, Input, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';

// A simple container for widgets with a header and an input area
@Component({
  selector: 'widgets-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {

  @Input() headerText: string = "";
  isExpanded: boolean = false;

  // The MAT_DIALOG_DATA injection token is used to inject data into the dialog component through its constructor.
  // This is used when the simple-card-component is opened as a dialog (when it's expanded).
  constructor(public dialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.headerText = data.headerText;
      this.isExpanded = data.isExpanded;
    }
  }

  ngOnInit(): void {
  }
  
  toggleExpansion(): void {  
    if (!this.isExpanded)  
      this.openDialog();
    else
      this.closeDialog();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      headerText: this.headerText,
      isExpanded: true,
    };

    this.dialog.open(SimpleCardComponent, dialogConfig);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

}
