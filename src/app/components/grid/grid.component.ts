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
    // Get all current component IDs in the container
    const currentComponentIds = Array.from(this.gridContainerRef.element.nativeElement.querySelectorAll('.component-wrapper'))
                                     .map((wrapper: any) => wrapper.getAttribute('data-component-id'));

    // Determine which components to keep (those that are in componentsConfig)
    const newComponentIds = this.componentsConfig.map(config => config.id);
    const componentIdsToRemove = currentComponentIds.filter(id => !newComponentIds.includes(id));

    // Remove components that are not in the new config
    componentIdsToRemove.forEach(id => {
        const componentToRemove = this.gridContainerRef.element.nativeElement.querySelector(`[data-component-id="${id}"]`);
        if (componentToRemove) {
            this.gridContainerRef.element.nativeElement.removeChild(componentToRemove);
        }
    });

    // Add or update components as per the new config
    this.componentsConfig.forEach(componentConfig => {
        const componentId = componentConfig.id;

        // Check if the component already existsf
        if (this.isComponentCreated(componentId)) {
            return;
        }

        // Create a wrapper for the new component
        const wrapper = this.gridContainerRef.element.nativeElement.ownerDocument.createElement('div');
        wrapper.className = 'component-wrapper';
        wrapper.setAttribute('data-component-id', componentId);
        this.gridContainerRef.element.nativeElement.appendChild(wrapper);

        // Create the component
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

    isComponentCreated(componentId: string) {
        // Check if a component with the given ID already exists in the container
        return this.gridContainerRef.element.nativeElement.querySelector(`[data-component-id="${componentId}"]`) !== null;
    }
}