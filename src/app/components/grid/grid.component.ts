import { Component, Input, ViewContainerRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { DynamicComponentConfig } from 'src/app/models/dynamic-component-config.model';

// Dynamically renders a collection of components within a grid layout. 
// Accepts an array of DynamicComponentConfig objects as an @Input, which details the component types and any associated inputs that need to be passed to them. 
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewInit, OnChanges {
  @Input() componentsConfig: DynamicComponentConfig[] = [];
  @ViewChild('gridContainer', { read: ViewContainerRef }) gridContainerRef!: ViewContainerRef;

  ngAfterViewInit() {
    this.loadComponents();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['componentsConfig'] && !changes['componentsConfig'].firstChange) {
      this.loadComponents();
    }
  }

  loadComponents() {
    this.clearWrapperElements();
    this.gridContainerRef.clear();    

    this.componentsConfig.forEach(componentConfig => {
      // Create a wrapper for the component
      const wrapper = this.gridContainerRef.element.nativeElement.ownerDocument.createElement('div');
      wrapper.className = 'component-wrapper';
      this.gridContainerRef.element.nativeElement.appendChild(wrapper);

      // Directly use the component class to create the component
      const componentRef = this.gridContainerRef.createComponent(componentConfig.component);      

      // Apply all inputs to the component instance
      if (componentConfig.inputs) {
        for (let key of Object.keys(componentConfig.inputs)) {
          componentRef.instance[key] = componentConfig.inputs[key];
        }
      }
      componentRef.changeDetectorRef.detectChanges();

      // Attach the component to the wrapper
      wrapper.appendChild((componentRef.hostView as any).rootNodes[0]);
    });
  }

  private clearWrapperElements() {
    const element = this.gridContainerRef.element.nativeElement;
    const wrappers = element.getElementsByClassName('component-wrapper');
    while (wrappers.length > 0) {
      wrappers[0].parentNode.removeChild(wrappers[0]);
    }
  }
}