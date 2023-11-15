import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicComponentConfig } from 'src/app/models/dynamic-component-config.model';
import { CategoryService } from 'src/app/widgets/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  selectedCategory: string = "";
  categoryWidgetsComponentConfig!: Map<string, DynamicComponentConfig[]>;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService    
  ) {}

  ngOnInit(): void {        
    this.categoryWidgetsComponentConfig = this.categoryService.getComponentsConfigForCategories();

    this.route.params.subscribe(params => {
      this.selectedCategory = params['categoryName'].charAt(0).toUpperCase() + params['categoryName'].slice(1);
    });
  }
}
