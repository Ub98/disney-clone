import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseSeries, ResponseSeriesId } from '../models/series';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  constructor(private http: HttpClient) {}

  options = {
    headers: new HttpHeaders({
      accept: 'application/json',
      Authorization: `${environment.API_TOKEN}`,
    }),
  };

  getSeriesById(id: number) {
    return this.http.get<ResponseSeriesId>(
      `${environment.BASE_URL}/tv/${id}?language=it`,
      this.options
    );
  }

  getSimilarById(id: number) {
    return this.http.get<ResponseSeries>(
      `${environment.BASE_URL}/tv/${id}/similar?language=it&page=1`,
      this.options
    );
  }

  getTodaySeries(page: number) {
    return this.http.get<ResponseSeries>(
      `${environment.BASE_URL}/tv/airing_today?language=it&page=${page}`,
      this.options
    );
  }
}
