import {
    Directive,
    EmbeddedViewRef,
    Input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef
  } from '@angular/core';
  
  @Directive({
    selector: '[wRecreateViewKey]'
  })
  export class RecreateViewDirective implements OnChanges {
    @Input('wRecreateViewKey') key: any;
  
    viewRef: EmbeddedViewRef<any> | null = null;
  
    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['key']) {
        if (this.viewRef)
          this.destroyView();          
        this.createView();
      }
    }
  
    private createView() {
      this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    }
  
    private destroyView() {
      this.viewRef!.destroy();
      this.viewRef = null;
    }
  }
  