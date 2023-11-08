import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Widget } from '../models/widget.model';
import { CardType } from '../utils/enums';
import { SimpleCardComponent } from '../utils/cards/simple-card/simple-card.component';
import { ProgrammingCardComponent } from '../utils/cards/programming-card/programming-card.component';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private defaultWidgets: Widget[] = [
    // TODO: Find a better way of assigning categories here

    // Writing Widgets
    new Widget('Summarizer', 1, 'Condenses content into a brief summary highlighting key points.', CardType.Simple),
    new Widget('Formalizer', 1, 'Converts casual language to a more formal tone suitable for professional contexts.', CardType.Simple),
    new Widget('Translator', 1, 'Translates text into multiple languages with context-aware precision.', CardType.Simple),
    new Widget('Grammar Corrector', 1, 'Scans text to identify and correct grammatical errors.', CardType.Simple),
    new Widget('Style Enhancer', 1, 'Analyzes and provides suggestions to improve the style and clarity of writing.', CardType.Simple),
  
    // Programming Widgets
    new Widget('Code Cleaner', 2, 'Formats and cleans up source code for better readability and maintenance.', CardType.Programming),
    new Widget('Bug Predictor', 2, 'Predicts potential bugs in code using historical data and pattern recognition.', CardType.Programming),
    new Widget('Code Autocompleter', 2, 'Offers real-time code completion suggestions to expedite coding tasks.', CardType.Programming),
    new Widget('Refactoring Assistant', 2, 'Suggests code refactoring for improved efficiency and readability.', CardType.Programming),
    new Widget('Security Auditor', 2, 'Scans code to detect and suggest fixes for potential security vulnerabilities.', CardType.Programming),
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
