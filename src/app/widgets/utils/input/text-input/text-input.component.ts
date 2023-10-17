import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'widgets-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  
  private _value: string = '';
  get value(): string {
    return this._value;
  }
  set value(val: string) {
    this._value = val;
    this.onChange(val);  // Notify the parent component about the change
    this.onTouched();
  }

  @Input() placeholder: string = "Enter text here...";
  @Input() parentHeight!: number;
  maxHeight!: string;

  onChange: any = () => {};
  onTouched: any = () => {};

  @ViewChild('textInputArea') textInput!: ElementRef;
  @Output() heightChanged = new EventEmitter<number>();

  ngOnInit(): void {
    this.maxHeight = `${this.parentHeight / 2}px`;
  }

  ngAfterViewInit(): void {
    // setTimeout pushes the height adjustment to the end of the call stack, ensuring that the view is fully rendered
    setTimeout(() => {
      this.adjustHeight();
      // Emit initial height
      this.heightChanged.emit(this.textInput.nativeElement.offsetHeight);
    });
  }

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  adjustHeight(): void {
    const textarea = this.textInput.nativeElement;
    const previousHeight = textarea.offsetHeight;
    // Reset the height to its default to get the scrollHeight correctly
    textarea.style.height = 'auto';
    // Set the height to the scrollHeight (the full height of the content)
    const newHeight = textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`;

    // Adjust top position so the textarea grows upwards
    const heightDifference = newHeight - previousHeight;
    if (heightDifference > 0) {
        textarea.style.top = `${parseInt(textarea.style.top || '0') - heightDifference}px`;
    }

    // Emit the higher height: newHeight or maxHeight
    const maxHeight = this.parentHeight / 2;  
    if (newHeight !== previousHeight) {
      this.heightChanged.emit(Math.min(newHeight, maxHeight));
    }
  }
} 
