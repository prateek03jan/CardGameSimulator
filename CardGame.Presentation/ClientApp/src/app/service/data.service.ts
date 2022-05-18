import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  sayhello(url: string) {
    return this.http.get(url);
  }

  simulateCardGame(items: string[], url: string): Observable<any> {
    return this.http.post(url, items);
  }
}
