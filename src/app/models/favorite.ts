import { ResponseMovieId } from './movie';
import { ResponseSeriesId } from './series';

export class FavoriteDto {
  constructor(
    public userId: number,
    public movie: ResponseMovieId | ResponseSeriesId,
    public movieId: number,
    public mediaType: string
  ) {}
}

export interface Favorite {
  id: number;
  userId: number;
  movie: ResponseMovieId | ResponseSeriesId;
  movieId: number;
  mediaType:string
}
