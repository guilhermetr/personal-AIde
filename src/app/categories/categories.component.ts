import { Component, OnInit } from '@angular/core';
import { SummarizerComponent } from '../widgets/writing/summarizer/summarizer.component';
import { TranslatorComponent } from '../widgets/writing/translator/translator.component';
import { FormalizerComponent } from '../widgets/writing/formalizer/formalizer.component';
import { ActivatedRoute } from '@angular/router';
import { CodeCleanerComponent } from '../widgets/programming/code-cleaner/code-cleaner.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  selectedCategory: string = "";
  categories: { [key: string]: any[]}  = {
    programming: [
      { component: CodeCleanerComponent }
    ],
    writing: [
      { component: SummarizerComponent, inputs: { /* input properties */ } },
      { component: TranslatorComponent, inputs: { /* input properties */ } },
      { component: FormalizerComponent, inputs: { /* input properties */ } },
    ]
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedCategory = params['categoryName'];
    });
  }

}
