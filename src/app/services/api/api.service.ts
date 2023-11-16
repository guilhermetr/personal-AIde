import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TaskType } from 'src/app/utils/enums';
import { CLOUD_FUNCTION_URL } from 'src/environments/environment';
import { FirebaseAuthService } from '../authentication/firebase-auth.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: FirebaseAuthService, private errorHandlingService: ErrorHandlingService) {}

  async generateText(inputText: string, taskType: TaskType): Promise<string> {
    const userIdToken = await this.authService.getIdToken();

    if (userIdToken == null) {
      this.errorHandlingService.displayLoginError('Please sign in and try again.');
      return '';
    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userIdToken}`
      });
  
      const requestBody = {
        prompt: this.getPrompt(inputText, taskType)
      };
  
      try {
        const response = await firstValueFrom(
          this.http.post<any>(CLOUD_FUNCTION_URL, requestBody, { headers: headers })
        );      
        return response.choices[0].message.content;
      } catch (_) {
        return '';
      }
    }    
  }

  getPrompt(inputText: string, taskType: TaskType): string {
    let prompt = '';

    switch (taskType) {
      // WRITING
      case TaskType.Summarizer:
        prompt = `Summarize the following text: ${inputText}`;
        break;
      case TaskType.Formalizer:
        prompt = `Rewrite the following text in a formal tone: ${inputText}`;
        break;
      case TaskType.Paraphraser:
        prompt = `Paraphrase the following text: ${inputText}`;
        break;
      case TaskType.GrammarCorrector:
        prompt = `Correct the grammar: ${inputText}`;
        break;
      case TaskType.Simplifier:
        prompt = `Simplify this text to make it easy to understand: ${inputText}`;
        break;

        // EDUCATION
      case TaskType.InteractiveQuizMaker:
        prompt = `Create a quiz based on the following educational content: ${inputText}`;
        break;
      case TaskType.MathProblemSolver:
        prompt = `Solve and explain the following math problem: ${inputText}`;
        break;
      case TaskType.LiteratureAnalysisHelper:
        prompt = `Analyze the following literary work, focusing on themes and character development: ${inputText}`;
        break; 
      case TaskType.LanguageLearningAssistant:
        prompt = `Provide language learning exercises and feedback for the following text, focusing on grammar, vocabulary, and pronunciation: ${inputText}`;
        break;
      case TaskType.HistoricalEventTimelineCreator:
        prompt = `Create a timeline of the historical events described in this text: ${inputText}`;
        break;
      case TaskType.ScienceExperimentIdeaGenerator:
        prompt = `Generate a science experiment idea based on this topic: ${inputText}`;
        break;           
      case TaskType.StudyHabitAnalyzer:
        prompt = `Analyze these study habits and provide recommendations for improvement: ${inputText}`;
        break;

      // PROGRAMMING
      case TaskType.RefactoringAssistant:
        prompt = `Suggest refactoring for improved efficiency and readability for the following code: ${inputText}. OUTPUT THE EXPLANATIONS AS COMMENTS.`;
        break;
      case TaskType.CodeCleaner:
        prompt = `Format and clean up the following source code for better readability and maintenance: ${inputText}. OUTPUT CODE ONLY.`;
        break;
      case TaskType.UnitTestingGenerator:
        prompt = `Generate unit tests for the following code: ${inputText}. OUTPUT CODE ONLY.`;
        break;
      case TaskType.DocumentationBuilder:
        prompt = `Generate documentation for the following code including function/method descriptions, parameter explanations, and return values: ${inputText}. OUTPUT CODE ONLY.`;
        break;
      case TaskType.ComplexityAnalyzer:
        prompt = `Analyze the complexity of the following code and suggest simplifications: ${inputText}. OUTPUT CODE ONLY. If there are no suggestions, output a comment explaining why.`;
        break;
      case TaskType.BestPracticesValidator:
        prompt = `Validate the following code against industry best practices and suggest improvements: ${inputText}. OUTPUT CODE ONLY.`;
        break;

        // HEALTH      
      case TaskType.NutritionGuideCreator:
        prompt = `Create a personalized nutrition guide based on these dietary preferences and goals: ${inputText}`;
        break;
      case TaskType.FitnessPlanGenerator:
        prompt = `Generate a fitness plan based on these physical conditions and fitness goals: ${inputText}`;
        break;
      case TaskType.SleepPatternAnalyzer:
        prompt = `Analyze these sleep habits and provide recommendations for improvement: ${inputText}`;
        break;
      case TaskType.HomeRemedyAdvisor:
        prompt = `Suggest home remedies for these symptoms: ${inputText}`;
        break;
      case TaskType.AllergyAlertCompiler:
        prompt = `Compile a list of allergens for this individual based on their health data: ${inputText}`;
        break;      
      case TaskType.MedicalTerminologyTranslator:
        prompt = `Translate this medical terminology into plain language: ${inputText}`;
        break;      
      default:
        prompt = inputText;
    }

    return prompt;
}

}
