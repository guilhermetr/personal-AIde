import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private defaultCategories!: Category[];
  private categoriesUrl = 'api/categories'; // URL to web API for custom categories

  constructor(private http: HttpClient) {
    this.defaultCategories = this.createDefaultCategories();
  }
    
  private createDefaultCategories(): Category[] {
    const categories = [
      'Writing',
      'Programming',      
    ];

    return categories.map((name, index) => new Category(name, false, index + 1));
  }

  getDefaultCategories(): Category[] {
    return this.defaultCategories;
  }

  getCustomCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(
      map(categories => categories.map(category => new Category(category.name, true, category.id))),
      catchError(this.handleError<Category[]>('getCustomCategories', []))
    );
  }

  // Combine both default and custom categories
  getAllCategories(): Observable<Category[]> {
    return this.getCustomCategories().pipe(
      catchError(this.handleError<Category[]>('getCustomCategories', [])),
      map(customCategories => [...this.getDefaultCategories(), ...customCategories])
    );
  }
  
  createCustomCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category).pipe(
      catchError(this.handleError<Category>('createCustomCategory'))
    );
  }
  
  updateCustomCategory(category: Category): Observable<any> {
    const url = `${this.categoriesUrl}/${category.id}`;
    return this.http.put(url, category).pipe(
      catchError(this.handleError<any>('updateCustomCategory'))
    );
  }
  
  deleteCustomCategory(categoryId: number): Observable<Category> {
    const url = `${this.categoriesUrl}/${categoryId}`;
    return this.http.delete<Category>(url).pipe(
      catchError(this.handleError<Category>('deleteCustomCategory'))
    );
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
