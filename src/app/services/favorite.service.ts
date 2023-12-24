import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Search } from '../models/search';
import { Observable, map, of, switchMap } from 'rxjs';
import { Favorite, FavoriteDto } from '../models/favorite';
import { environment } from '../../environments/environment';
import { ResponseMovieId } from '../models/movie';
import { ResponseSeriesId } from '../models/series';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // addFavorite(
  //   movieId: number,
  //   movie: ResponseMovieId | ResponseSeriesId
  // ): Observable<Favorite | undefined> {
  //   if (this.authService.isUserLogged) {
  //     let model = new FavoriteDto(
  //       this.authService.getLoggedUser()!.user.id,
  //       movie,
  //       movieId
  //     );

  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         Authorization:
  //           'Bearer ' + this.authService.getLoggedUser()?.accessToken,
  //       }),
  //     };

  //     return this.http.post<Favorite>(
  //       `${environment.JSON_SERVER_BASE_URL}/favorite`,
  //       model,
  //       httpOptions
  //     );
  //   } else {
  //     return of(undefined);
  //   }
  // }

  // getFavorite(): Observable<Favorite[]> {
  //   if (this.authService.isUserLogged) {
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         Authorization:
  //           'Bearer ' + this.authService.getLoggedUser()!.accessToken,
  //       }),
  //     };

  //     return this.http.get<Favorite[]>(
  //       `${environment.JSON_SERVER_BASE_URL}/favorite?userId=${
  //         this.authService.getLoggedUser()?.user.id
  //       }`,
  //       httpOptions
  //     );
  //   } else {
  //     return of([]);
  //   }
  // }

  addFavorite(
    movieId: number,
    movie: ResponseMovieId | ResponseSeriesId,
    mediaType: string
  ): Observable<Favorite | undefined> {
    const userId = this.authService.getLoggedUser()!.user.id;

    return this.isMovieFavorite(movie).pipe(
      switchMap((isFavorite) => {
        if (isFavorite) {
          return of(undefined);
        } else {
          const model = new FavoriteDto(userId, movie, movieId, mediaType);

          const httpOptions = {
            headers: new HttpHeaders({
              Authorization:
                'Bearer ' + this.authService.getLoggedUser()?.accessToken,
            }),
          };

          return this.http.post<Favorite>(
            `${environment.JSON_SERVER_BASE_URL}/favorite`,
            model,
            httpOptions
          );
        }
      })
    );
  }

  isMovieFavorite(
    movie: ResponseMovieId | ResponseSeriesId
  ): Observable<boolean> {
    const userId = this.authService.getLoggedUser()!.user.id;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Bearer ' + this.authService.getLoggedUser()?.accessToken,
      }),
    };

    return this.http
      .get<Favorite[]>(
        `${environment.JSON_SERVER_BASE_URL}/favorite?userId=${userId}&movieId=${movie.id}`,
        httpOptions
      )
      .pipe(map((favorites) => favorites.length > 0));
  }

  getIdFavoriteServer( movie: ResponseMovieId | ResponseSeriesId):Observable<number[]>{
    const userId = this.authService.getLoggedUser()!.user.id;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Bearer ' + this.authService.getLoggedUser()?.accessToken,
      }),
    };

    return this.http
      .get<Favorite[]>(
        `${environment.JSON_SERVER_BASE_URL}/favorite?userId=${userId}&movieId=${movie.id}`,
        httpOptions
      )
      // .pipe(map((favorites) => favorites.id); con observable non di tipo [] mi ritorna undefined, perchè?
      .pipe(map((favorites) => favorites.map(favorite => favorite.id)));
  }

  getFavorite(): Observable<Favorite[]> {
    const userId = this.authService.getLoggedUser()!.user.id;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Bearer ' + this.authService.getLoggedUser()!.accessToken,
      }),
    };

    return this.http.get<Favorite[]>(
      `${environment.JSON_SERVER_BASE_URL}/favorite?userId=${userId}`,
      httpOptions
    );
  }

  //risolvi error 404
  //la delete funziona solo tramite id, ottengo id dal json e lo passo alla delete
  deleteFavorite(
   id: number
  ): Observable<any> {
    const userId = this.authService.getLoggedUser()!.user.id;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Bearer ' + this.authService.getLoggedUser()?.accessToken,
      }),
    };

    return this.http.delete<any>(
      `${environment.JSON_SERVER_BASE_URL}/favorite/${id}`,
      httpOptions
    );
  }
}
