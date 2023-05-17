import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[mainBorder]'
})
export class MainBorderDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.border = '1px solid blue';
  }
  
}
