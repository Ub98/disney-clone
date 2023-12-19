import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseSearch } from '../models/search';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  options = {
    headers: new HttpHeaders({
      accept: 'application/json',
      Authorization: `${environment.API_TOKEN}`,
    }),
  };

  getSearch(query: string, page: number): Observable<ResponseSearch> {
    return this.http.get<ResponseSearch>(
      `${environment.BASE_URL}/search/multi?query=${encodeURI(query)}&include_adult=false&language=it&page=${page}`,
      this.options
    );
  }
}
