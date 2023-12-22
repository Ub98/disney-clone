import { ResponseMovieId } from './movie';
import { ResponseSeriesId } from './series';

export class FavoriteDto {
  constructor(
    public userId: number,
    public movie: ResponseMovieId | ResponseSeriesId,
    public isFavorite: boolean = true
  ) {}
}

export interface Favorite {
  id: number;
  userId: number;
  movie: ResponseMovieId | ResponseSeriesId;
  isFavorite: boolean;
}
