import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeCleanerComponent } from 'src/app/widgets/components/programming/code-cleaner/code-cleaner.component';
import { FormalizerComponent } from 'src/app/widgets/components/writing/formalizer/formalizer.component';
import { SummarizerComponent } from 'src/app/widgets/components/writing/summarizer/summarizer.component';
import { TranslatorComponent } from 'src/app/widgets/components/writing/translator/translator.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  selectedCategory: string = "";
  categories: { [key: string]: any[]}  = { // TODO: Use the categories service
    programming: [
      { component: CodeCleanerComponent }
    ],
    writing: [
      { component: SummarizerComponent },
      { component: TranslatorComponent },
      { component: FormalizerComponent },
    ]
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedCategory = params['categoryName'];
    });
  }

}
