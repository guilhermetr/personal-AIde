import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auto-resizable-text-area',
  templateUrl: './auto-resizable-text-area.component.html',
  styleUrls: ['./auto-resizable-text-area.component.css']
})
export class AutoResizableTextAreaComponent implements OnInit {
  @Input() placeholder: string = "";
  @Input() readonly: boolean = false;
  @Input() value!: string;
  @Input() set height(value: number) {
    const textArea = this.elementRef.nativeElement.getElementsByTagName('textarea')[0];   
    this.renderer.setStyle(textArea, 'height', '0');
    this.renderer.setStyle(textArea, 'height', `${value}px`);   
  }

  @Output() valueChange = new EventEmitter<string>();    
  @Output() heightChange = new EventEmitter<number>();
  
  @ViewChild('textarea') textareaRef!: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  // This hook is used to ensure the DOM is ready before accessing the element
  ngAfterViewInit() {
    const textArea = this.elementRef.nativeElement.getElementsByTagName('textarea')[0];
    this.setupTextAreaAutoResize(textArea);
    this.updateTextAreaReadonly(textArea);
  }
  
  private setupTextAreaAutoResize(textArea: HTMLTextAreaElement) {    
    this.renderer.setAttribute(textArea, 'style', `height:${textArea.scrollHeight}px;overflow-y:hidden;`);
    // `bind(this)` ensures that the `this` context inside the onInput function refers to the component instance
    this.renderer.listen(textArea, 'input', this.onInput.bind(this));
  }

  private onInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;    
    this.renderer.setStyle(textArea, 'height', '0');
    this.renderer.setStyle(textArea, 'height', `${textArea.scrollHeight}px`);    
    this.heightChange.emit(textArea.scrollHeight);
  }  

  private updateTextAreaReadonly(textArea: HTMLTextAreaElement) {   
    if (this.readonly) {
      this.renderer.setAttribute(textArea, 'readonly', '');
    }
  }
  
  onValueChange(value: string) {    
    this.valueChange.emit(value);
  }  
}
