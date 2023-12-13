import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMovie } from '../models/movie';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  options = {
    headers: new HttpHeaders({
      accept: 'application/json',
      Authorization: `${environment.API_TOKEN}`,
    }),
  };

  getMovieData(): Observable<ResponseMovie> {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/discover/movie?include_adult=false&include_video=true&language=it&page=1&sort_by=popularity.desc`,
      this.options
    );
  }

  getMovieBySearch(query: string, page: number): Observable<ResponseMovie> {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/search/movie?query=${query}&include_adult=false&language=it&page=${page}`,
      this.options
    );
  }
}
