import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HUGGING_FACE_API_TOKEN, HUGGING_FACE_API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationAPI {
  private translationAPIURL = `${HUGGING_FACE_API_URL}Helsinki-NLP/opus-mt-es-en`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${HUGGING_FACE_API_TOKEN}`
    })
  };

  constructor(private http: HttpClient) { }

  post(data: any): Observable<any> {
    return this.http.post<any>(this.translationAPIURL, data, this.httpOptions);
  }
}
