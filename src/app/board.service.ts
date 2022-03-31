import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  submit(data):Observable<any> {
    return this.http.get('http://localhost:8000/stocks/fds');
  }
}
