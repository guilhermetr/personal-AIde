import { Component, Inject, Input, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { TextInputComponent } from '../../input/text-input/text-input.component';

// A simple container for widgets with a header and an input area
@Component({
  selector: 'widgets-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {

  dialogRef!: MatDialogRef<SimpleCardComponent>

  @Input() headerText: string = "";  
  cardBodyHeight: number = 300;
  textInput: string = "";
  textOutput: string = "";

  isExpanded: boolean = false;
  isLoading: boolean = false;

  @ViewChild(TextInputComponent) textInputComponent!: TextInputComponent;

  // The MAT_DIALOG_DATA injection token is used to inject data into the dialog component through its constructor.
  // This is used when the simple-card-component is opened as a dialog (when it's expanded).
  constructor(
    public dialog: MatDialog, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    const isDialog = this.dialogRef != undefined;
    if (isDialog) {
      this.headerText = this.data.headerText;
      this.isExpanded = this.data.isExpanded;
      this.textInput = this.data.textInput;
      this.textOutput = this.data.textOutput;

      this.dialogRef.backdropClick().subscribe(() => {
        this.closeDialog();
      });
    }
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
      textInput: this.textInput,
      textOutput: this.textOutput,
    };

    const dialogRef = this.dialog.open(SimpleCardComponent, dialogConfig);
    dialogRef.componentInstance.dialogRef = dialogRef;
    
    dialogRef.afterClosed().subscribe((result: any) => {
      this.textInput = result.textInput;
      this.textOutput = result.codeOutput;
      // setTimeout pushes the height adjustment to the end of the call stack, ensuring that the view is fully rendered
      setTimeout(() => {
        this.textInputComponent.adjustHeight();
      });  
    });
  }

  closeDialog(): void {
    this.dialogRef.close({            
      textInput: this.textInput,
      textOutput: this.textOutput,
     });
  }

  handleInputSubmit(event: any): void {
      this.isLoading = true;

      // Simulate API call delay using setTimeout
      setTimeout(() => {
          // Handle the logic of sending the input to the API here

          this.isLoading = false;  // Set loading to false after getting the API response
      }, 2000);  // Simulating a delay of 2 seconds for the API response
  }

}
