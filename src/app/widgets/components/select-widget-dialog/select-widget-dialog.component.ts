import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WidgetService } from '../../services/widget.service';
import { Widget } from '../../models/widget.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-select-widget-dialog',
  templateUrl: './select-widget-dialog.component.html',
  styleUrls: ['./select-widget-dialog.component.scss']
})
export class SelectWidgetDialogComponent implements OnInit {
  availableWidgets: Widget[] = [];
  filteredWidgets: Widget[] = [];
  selectedWidgets: Map<string, boolean> = new Map();
  categories: Category[] = [];
  defaultCategory: Category = new Category('All', false, -1);

  constructor(
    public dialogRef: MatDialogRef<SelectWidgetDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private widgetService: WidgetService, 
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadWidgets();
    this.loadCategories();
  }

  loadWidgets(): void {      
    this.availableWidgets = this.widgetService.getDefaultWidgets();
    this.filteredWidgets = [...this.availableWidgets];

    // Initialize selection state  
    this.availableWidgets.forEach((widget: Widget) => {
      this.selectedWidgets.set(widget.name, false); // TODO: Use widget.id instead of name
    });
    if (this.data?.selectedWidgets != undefined) {
      this.data.selectedWidgets.forEach((widget: Widget) => {
        this.selectedWidgets.set(widget.name, true);
      });
    }    
  }

  loadCategories(): void {    
    this.categories = [this.defaultCategory, ...this.categoryService.getDefaultCategories()];
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();     
    this.filteredWidgets = this.availableWidgets.filter(widget =>
      widget.name.toLowerCase().includes(filterValue) ||
      widget.description.toLowerCase().includes(filterValue)
    );
  }  

  filterByCategory(category: Category): void {
    if (category.id == -1) // Show all categories
      this.filteredWidgets = this.availableWidgets;
    else 
      this.filteredWidgets = this.availableWidgets.filter(widget =>
        widget.categoryId === category.id
      );
  }

  onSelectWidget(widget: Widget): void {    
    const isSelected = this.selectedWidgets.get(widget.name);
    this.selectedWidgets.set(widget.name, !isSelected);
  }

  closeDialog(): void {
    const selectedWidgetsArray: Widget[] = this.filteredWidgets.filter(
      widget => this.selectedWidgets.get(widget.name)
    );

    this.dialogRef.close(selectedWidgetsArray);
  }
   
}
