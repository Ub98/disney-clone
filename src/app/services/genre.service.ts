import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseGenre } from '../models/genres';
import { Observable } from 'rxjs';
import { ResponseMovie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}

  options = {
    headers: new HttpHeaders({
      accept: 'application/json',
      Authorization: `${environment.API_TOKEN}`,
    }),
  };

  getGenreMovie(): Observable<ResponseGenre> {
    return this.http.get<ResponseGenre>(
      `${environment.BASE_URL}/genre/movie/list?language=it`,
      this.options
    );
  }

  getMovieByGenre(genreValue: number, page:number): Observable<ResponseMovie> {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/discover/movie?include_adult=false&include_video=true&language=it&page=${page}&sort_by=popularity.desc&with_genres=${genreValue}`,
      this.options
    );
  }

  getGenreSerie(): Observable<ResponseGenre> {
    return this.http.get<ResponseGenre>(
      `${environment.BASE_URL}/genre/tv/list?language=it`,
      this.options
    );
  }

  getSerieByGenre(genreValue: number, page:number): Observable<ResponseMovie> {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/discover/tv?include_adult=false&include_video=true&language=it&page=${page}&sort_by=popularity.desc&with_genres=${genreValue}`,
      this.options
    );
  }
}
