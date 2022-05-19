import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  SIMULATE_CARD_URL: string = '';
  constructor(private http: HttpClient) {}

  simulateCardGame(items: string[], url: string): Observable<any> {
    this.SIMULATE_CARD_URL = url;
    return this.http.post(url, items);
  }
}
