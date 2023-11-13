import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicComponentConfig } from 'src/app/models/dynamic-component-config.model';
import { ProgrammingCardComponent } from 'src/app/widgets/components/cards/programming-card/programming-card.component';
import { SimpleCardComponent } from 'src/app/widgets/components/cards/simple-card/simple-card.component';
import { Category } from 'src/app/widgets/models/category.model';
import { Widget } from 'src/app/widgets/models/widget.model';
import { CategoryService } from 'src/app/widgets/services/category.service';
import { WidgetService } from 'src/app/widgets/services/widget.service';

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
