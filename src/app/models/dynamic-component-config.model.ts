import { Type } from "@angular/core";

// Interface that combines a reference to a component class with its associated initialization data. 
// This facilitates the dynamic creation of components, each with their specific configuration.
export interface DynamicComponentConfig {
    component: Type<any>;
    inputs?: { [key: string]: any }; // Optional inputs for each component
  }
  