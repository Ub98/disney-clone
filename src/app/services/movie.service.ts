import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMovie, ResponseMovieId } from '../models/movie';
import { environment } from '../../environments/environment';
import { ResponseSearch } from '../models/search';

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

  getMovieData(page: number): Observable<ResponseMovie> {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/discover/movie?include_adult=false&include_video=true&language=it&page=${page}&sort_by=popularity.desc`,
      this.options
    );
  }

  getMovieBySearch(query: string, page: number): Observable<ResponseMovie> {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/search/movie?query=${query}&include_adult=false&language=it&page=${page}`,
      this.options
    );
  }

  getTrendingDay(): Observable<ResponseSearch> {
    return this.http.get<ResponseSearch>(
      `${environment.BASE_URL}/trending/all/day?language=it`,
      this.options
    );
  }

  getNowPlayingMovie(page: number) {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/movie/now_playing?language=it&page=${page}`,
      this.options
    );
  }

  getTopRatedMovie(page: number) {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/movie/top_rated?language=it&page=${page}`,
      this.options
    );
  }

  getUpComingMovie(page: number) {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/movie/upcoming?language=it&page=${page}`,
      this.options
    );
  }

  getAdventureMovie(page: number) {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/discover/movie?include_adult=false&include_video=true&language=it&page=${page}&sort_by=popularity.desc&with_genres=12`,
      this.options
    );
  }

  getAnimationMovie(page: number) {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/discover/movie?include_adult=false&include_video=true&language=it&page=${page}&sort_by=popularity.desc&with_genres=16`,
      this.options
    );
  }

  getThrillerMovie(page: number) {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/discover/movie?include_adult=false&include_video=true&language=it&page=${page}&sort_by=popularity.desc&with_genres=53`,
      this.options
    );
  }

  getComedyMovie(page: number) {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/discover/movie?include_adult=false&include_video=true&language=it&page=${page}&sort_by=popularity.desc&with_genres=35`,
      this.options
    );
  }

  getDocumentaryMovie(page: number) {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/discover/movie?include_adult=false&include_video=true&language=it&page=${page}&sort_by=popularity.desc&with_genres=99`,
      this.options
    );
  }

  getMovieById(id: number) {
    return this.http.get<ResponseMovieId>(
      `${environment.BASE_URL}/movie/${id}?language=it`,
      this.options
    );
  }

  getSimilarById(id: number) {
    return this.http.get<ResponseMovie>(
      `${environment.BASE_URL}/movie/${id}/similar?language=it&page=1`,
      this.options
    );
  }
}
