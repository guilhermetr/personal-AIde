import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Widget } from '../models/widget.model';
import { CardType } from '../utils/enums';
import { SimpleCardComponent } from '../components/cards/simple-card/simple-card.component';
import { ProgrammingCardComponent } from '../components/cards/programming-card/programming-card.component';
import { TaskType } from 'src/app/utils/enums';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private defaultWidgets: Widget[] = [
    // TODO: Find a better way of assigning categories here

    // Writing Widgets
    new Widget('Summarizer', 1, 'Condense content into a brief summary highlighting key points.', CardType.Simple, TaskType.Summarizer),
    new Widget('Formalizer', 1, 'Convert casual language to a more formal tone suitable for professional contexts.', CardType.Simple, TaskType.Formalizer),    
    new Widget('Grammar Corrector', 1, 'Identify and correct grammatical errors.', CardType.Simple, TaskType.GrammarCorrector),    
    new Widget('Paraphraser', 1, 'Rewrite sentences or paragraphs using different words while keeping the original meaning intact.', CardType.Simple, TaskType.Paraphraser),
    new Widget('Simplifier', 1, 'Simplify complex text to make it accessible to a wider audience or for educational purposes.', CardType.Simple, TaskType.Simplifier),
  
    // Programming Widgets
    new Widget('Refactoring Assistant', 2, 'Get code refactoring suggestions for improved efficiency and readability.', CardType.Programming, TaskType.RefactoringAssistant),
    new Widget('Code Cleaner', 2, 'Format and clean up code for better readability and maintenance.', CardType.Programming, TaskType.CodeCleaner),
    new Widget('Unit Test Generator', 2, 'Generate unit test cases.', CardType.Programming, TaskType.UnitTestingGenerator),
    new Widget('Documentation Builder', 2, 'Generate basic documentation, including function/method descriptions, parameter explanations, and return values.', CardType.Programming, TaskType.DocumentationBuilder),
    new Widget('Complexity Analyzer', 2, 'Evaluate code complexity and get suggestions to simplify it.', CardType.Programming, TaskType.ComplexityAnalyzer),
    new Widget('Best Practices Validator', 2, 'Review code against industry best practices and get recommendations for aligning with standard coding conventions.', CardType.Programming, TaskType.BestPracticesValidator),
  ];

  // Used for retrieving which card component should be rendered for a given Widget
  private widgetComponentsRegistry: Map<CardType, Type<any>> = new Map<CardType, Type<any>> ([
    [CardType.Simple, SimpleCardComponent],
    [CardType.Programming, ProgrammingCardComponent],
  ]);  
  
  private widgetsUrl = 'api/widgets'; // URL to web API for custom widgets

  constructor(private http: HttpClient) {
    this.defaultWidgets.forEach(widget => {
      
    });
  }
  
  getDefaultWidgets(): Widget[] {
    return this.defaultWidgets;
  }

  getCustomWidgets(): Observable<Widget[]> {
    return this.http.get<Widget[]>(this.widgetsUrl).pipe(
      map(widgets => widgets.map(widget => ({ ...widget, isCustom: true }))),
      catchError(this.handleError<Widget[]>('getCustomWidgets', []))
    );
  }

  // Combine both default and custom widgets
  getAllWidgets(): Observable<Widget[]> {
    return this.getCustomWidgets().pipe(
      catchError(this.handleError<Widget[]>('getCustomWidgets', [])),
      map(customWidgets => [...this.getDefaultWidgets(), ...customWidgets])
    );
  }
  
  createCustomWidget(widget: Widget): Observable<Widget> {
    return this.http.post<Widget>(this.widgetsUrl, widget).pipe(
      catchError(this.handleError<Widget>('createCustomWidget'))
    );
  }
  
  updateCustomWidget(widget: Widget): Observable<any> {
    const url = `${this.widgetsUrl}/${widget.id}`;
    return this.http.put(url, widget).pipe(
      catchError(this.handleError<any>('updateCustomWidget'))
    );
  }
  
  deleteCustomWidget(widgetId: number): Observable<Widget> {
    const url = `${this.widgetsUrl}/${widgetId}`;
    return this.http.delete<Widget>(url).pipe(
      catchError(this.handleError<Widget>('deleteCustomWidget'))
    );
  }
  
  // Function to get the component for a CardType
  getWidgetComponent(cardType: CardType): Type<any> | undefined {
    return this.widgetComponentsRegistry.get(cardType);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
