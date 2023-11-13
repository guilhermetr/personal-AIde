import { Type } from "@angular/core";

// Class that combines a reference to a component class with its associated initialization data. 
// This facilitates the dynamic creation of components, each with their specific configuration.
export class DynamicComponentConfig {
    id: string;
    component: Type<any>;
    inputs?: { [key: string]: any }; // Optional inputs for each component

    constructor(id: string, component: Type<any>, inputs: { [key: string]: any }) {
      this.id = id;
      this.component = component;
      this.inputs = inputs;
    }
}
  