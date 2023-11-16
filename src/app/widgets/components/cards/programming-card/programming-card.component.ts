import { Component, ElementRef, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { TextInputComponent } from '../../input/text-input/text-input.component';
import { CodeEditorComponent } from '../../input/code-editor/code-editor.component';
import { ApiService } from 'src/app/services/api/api.service';
import { TaskType } from 'src/app/utils/enums';

@Component({
  selector: 'widgets-programming-card',
  templateUrl: './programming-card.component.html',
  styleUrls: ['./programming-card.component.scss']
})
export class ProgrammingCardComponent implements OnInit {

  dialogRef!: MatDialogRef<ProgrammingCardComponent>
  isDialog!: boolean;
  
  @Input() title: string = "";
  @Input() taskType!: TaskType;
  cardBodyHeight: number = 300;
  expandedCardBodyHeight: string = '88vh'
  codeEditorHeight!: number;
  codeInput: string = "";
  codeOutput: string = "";
  textInput: string = "";

  isExpanded: boolean = false;
  isLoading: boolean = false;

  @ViewChild('inputCodeEditor') inputCodeEditorComponent!: CodeEditorComponent;
  @ViewChild('outputCodeEditor') outputCodeEditorComponent!: CodeEditorComponent;
  @ViewChild('cardBody') cardBody!: ElementRef;
  @ViewChild(TextInputComponent) textInputComponent!: TextInputComponent;

  // The MAT_DIALOG_DATA injection token is used to inject data into the dialog component through its constructor.
  // This is used when the simple-card-component is opened as a dialog (when it's expanded).
  constructor(
    public dialog: MatDialog, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.isDialog = this.dialogRef != undefined;
    if (this.isDialog) {
      this.title = this.data.headerText;
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
      headerText: this.title,
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
      // setTimeout pushes the height adjustment to the end of the call stack, ensuring that the view is fully rendered
      setTimeout(() => {
        this.textInputComponent.adjustHeight();
      });  
    });
  }

  closeDialog(): void {
    this.dialogRef.close({
      codeInput: this.codeInput,
      codeOutput: this.codeOutput,
      textInput: this.textInput
     });
  }

  handleInputHeightChanged(height: number) {    
    const newCodeEditorHeight = this.cardBodyHeight - height;
    if (this.codeEditorHeight != newCodeEditorHeight) {
      this.updateEditorsHeight(newCodeEditorHeight);
    }    
  }

  updateEditorsHeight(height: number) {
    this.codeEditorHeight = height;
    this.inputCodeEditorComponent.height = `${height}px`;
    this.inputCodeEditorComponent.updateView = !this.inputCodeEditorComponent.updateView;
    this.outputCodeEditorComponent.updateView = !this.inputCodeEditorComponent.updateView;
  }

  async handleInputSubmit(): Promise<void> {
    this.isLoading = true;
    this.codeOutput = await this.apiService.generateText(`${this.codeInput} ${this.textInput}`, this.taskType);
    this.textInput = "";    
    this.isLoading = false;
  }

  copyOutput(): void {
    navigator.clipboard.writeText(this.codeOutput);
  } 

}
