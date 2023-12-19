import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseVideo } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  options = {
    headers: new HttpHeaders({
      accept: 'application/json',
      Authorization: `${environment.API_TOKEN}`,
    }),
  };

  getVideoMovie(id:number){
    return this.http.get<ResponseVideo>(
      `${environment.BASE_URL}/movie/${id}/videos?language=en`,
      this.options
    );
  }

  getVideoSeries(id:number){
    return this.http.get<ResponseVideo>(
      `${environment.BASE_URL}/tv/${id}/videos?language=en`,
      this.options
    );
  }
}
