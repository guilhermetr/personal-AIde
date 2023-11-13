import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProgrammingLanguage } from '../../../utils/enums';

@Injectable({
  providedIn: 'root'
})
export class ProgrammingService {
  private selectedLanguageSubject: BehaviorSubject<ProgrammingLanguage> = new BehaviorSubject<ProgrammingLanguage>(ProgrammingLanguage.JavaScript);
  
  setSelectedLanguage(language: ProgrammingLanguage): void {
    this.selectedLanguageSubject.next(language);
  }
  
  getSelectedLanguage(): Observable<ProgrammingLanguage> {
    return this.selectedLanguageSubject.asObservable();
  }
}
