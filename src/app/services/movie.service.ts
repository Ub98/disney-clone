import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  url =
    'https://api.themoviedb.org/3/movie/popular?api_key=38ad7c04338432c40248d6af71ca0ca8&language=it&page=1';

  getMovieData(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }
}
