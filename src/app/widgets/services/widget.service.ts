import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Widget } from '../models/widget.model';
import { CardType, CategoryId } from '../utils/enums';
import { SimpleCardComponent } from '../components/cards/simple-card/simple-card.component';
import { ProgrammingCardComponent } from '../components/cards/programming-card/programming-card.component';
import { TaskType } from 'src/app/utils/enums';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private defaultWidgets: Widget[] = [
    // TODO: Find a better way of assigning categories here

    // WRITING
    new Widget('Summarizer', CategoryId.Writing, 'Condense content into a brief summary highlighting key points.', CardType.Simple, TaskType.Summarizer),
    new Widget('Formalizer', CategoryId.Writing, 'Convert casual language to a more formal tone suitable for professional contexts.', CardType.Simple, TaskType.Formalizer),    
    new Widget('Grammar Corrector', CategoryId.Writing, 'Identify and correct grammatical errors.', CardType.Simple, TaskType.GrammarCorrector),    
    new Widget('Paraphraser', CategoryId.Writing, 'Rewrite sentences or paragraphs using different words while keeping the original meaning intact.', CardType.Simple, TaskType.Paraphraser),
    new Widget('Simplifier', CategoryId.Writing, 'Simplify complex text to make it accessible to a wider audience or for educational purposes.', CardType.Simple, TaskType.Simplifier),
  
    // EDUCATION
    new Widget('Interactive Quiz Maker', CategoryId.Education, 'Generate engaging and educational quizzes from the provided content.', CardType.Simple, TaskType.InteractiveQuizMaker),
    new Widget('Math Problem Solver', CategoryId.Education, 'Offer solutions and explanations for a range of math problems, enhancing learning and understanding.', CardType.Simple, TaskType.MathProblemSolver),
    new Widget('Literature Analysis Helper', CategoryId.Education, 'Assist in the analysis of literary works, focusing on themes, characters, and narrative structures.', CardType.Simple, TaskType.LiteratureAnalysisHelper),
    new Widget('Language Learning Assistant', CategoryId.Education, 'Facilitates language learning with exercises and feedback, covering grammar, vocabulary, and pronunciation.', CardType.Simple, TaskType.LanguageLearningAssistant),
    new Widget('Historical Event Timeline Creator', CategoryId.Education, 'Create interactive timelines from historical texts to visualize events chronologically.', CardType.Simple, TaskType.HistoricalEventTimelineCreator),
    new Widget('Science Experiment Idea Generator', CategoryId.Education, 'Provide creative and educational science experiment ideas based on specific topics.', CardType.Simple, TaskType.ScienceExperimentIdeaGenerator),    
    new Widget('Study Habit Analyzer', CategoryId.Education, 'Evaluate study patterns and provide personalized recommendations for more effective learning.', CardType.Simple, TaskType.StudyHabitAnalyzer),

    // PROGRAMMING
    new Widget('Refactoring Assistant', CategoryId.Programming, 'Get code refactoring suggestions for improved efficiency and readability.', CardType.Programming, TaskType.RefactoringAssistant),
    new Widget('Code Cleaner', CategoryId.Programming, 'Format and clean up code for better readability and maintenance.', CardType.Programming, TaskType.CodeCleaner),
    new Widget('Unit Test Generator', CategoryId.Programming, 'Generate unit test cases.', CardType.Programming, TaskType.UnitTestingGenerator),
    new Widget('Documentation Builder', CategoryId.Programming, 'Generate basic documentation, including function/method descriptions, parameter explanations, and return values.', CardType.Programming, TaskType.DocumentationBuilder),
    new Widget('Complexity Analyzer', CategoryId.Programming, 'Evaluate code complexity and get suggestions to simplify it.', CardType.Programming, TaskType.ComplexityAnalyzer),
    new Widget('Best Practices Validator', CategoryId.Programming, 'Review code against industry best practices and get recommendations for aligning with standard coding conventions.', CardType.Programming, TaskType.BestPracticesValidator),

    // Health Widgets
    new Widget('Nutrition Guide Creator', CategoryId.Health, 'Generate personalized nutrition guides based on individual dietary preferences, restrictions, and health goals.', CardType.Simple, TaskType.NutritionGuideCreator),
    new Widget('Fitness Plan Generator', CategoryId.Health, 'Create custom fitness plans tailored to individual goals, physical condition, and preferences.', CardType.Simple, TaskType.FitnessPlanGenerator),
    new Widget('Sleep Pattern Analyzer', CategoryId.Health, 'Analyze sleep habits and patterns to provide actionable recommendations for improving sleep quality.', CardType.Simple, TaskType.SleepPatternAnalyzer),
    new Widget('Home Remedy Advisor', CategoryId.Health, 'Offer home remedy suggestions for common ailments based on symptoms.', CardType.Simple, TaskType.HomeRemedyAdvisor),
    new Widget('Allergy Alert Compiler', CategoryId.Health, 'Compile and alert users about potential allergens based on personal health data and environmental factors.', CardType.Simple, TaskType.AllergyAlertCompiler),    
    new Widget('Medical Terminology Translator', CategoryId.Health, 'Translate complex medical terms into easily understandable language for patient comprehension.', CardType.Simple, TaskType.MedicalTerminologyTranslator),    
  ];

  // Used for retrieving which card component should be rendered for a given Widget
  private widgetComponentsRegistry: Map<CardType, Type<any>> = new Map<CardType, Type<any>> ([
    [CardType.Simple, SimpleCardComponent],
    [CardType.Programming, ProgrammingCardComponent],
  ]);  
  
  private widgetsUrl = 'api/widgets'; // URL to web API for custom widgets
  selectedWidgets: Widget[] = [];

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
