import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';

@Component({
  selector: 'widgets-programming-card',
  templateUrl: './programming-card.component.html',
  styleUrls: ['./programming-card.component.scss']
})
export class ProgrammingCardComponent implements OnInit {

  dialogRef!: MatDialogRef<ProgrammingCardComponent>

  codeEditorHeight = "100%"
  @Input() headerText: string = "";
  isExpanded: boolean = false;

  codeInput: string = "";
  codeOutput: string = "";
  textInput: string = "";

  // The MAT_DIALOG_DATA injection token is used to inject data into the dialog component through its constructor.
  // This is used when the simple-card-component is opened as a dialog (when it's expanded).
  constructor(
    public dialog: MatDialog, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    const isDialog = this.dialogRef != undefined;
    if (isDialog) {
      this.headerText = this.data.headerText;
      this.isExpanded = this.data.isExpanded;
      this.codeInput = this.data.codeInput;
      this.codeOutput = this.data.codeOutput;
      this.textInput = this.data.textInput;

      this.dialogRef.backdropClick().subscribe(() => {
        this.closeDialog();
      });
    }
  }
  
  
  toggleExpansion(): void {  
    if (!this.isExpanded) {
      this.openDialog();
      this.codeEditorHeight = "100%";
    }      
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
      codeInput: this.codeInput,
      codeOutput: this.codeOutput,
      textInput: this.textInput,      
    };

    const dialogRef = this.dialog.open(ProgrammingCardComponent, dialogConfig);
    dialogRef.componentInstance.dialogRef = dialogRef;
    
    dialogRef.afterClosed().subscribe((result: any) => {
      this.codeInput = result.codeInput;
      this.codeOutput = result.codeOutput;
      this.textInput = result.textInput;
    });
  }

  closeDialog(): void {
    this.dialogRef.close({
      codeInput: this.codeInput,
      codeOutput: this.codeOutput,
      textInput: this.textInput
     });
  }

}
