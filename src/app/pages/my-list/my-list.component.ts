import { Component, OnInit } from '@angular/core';
import { Search } from '../../models/search';
import { FavoriteService } from '../../services/favorite.service';
import { ResponseMovieId } from '../../models/movie';
import { ResponseSeriesId } from '../../models/series';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss',
})
export class MyListComponent implements OnInit {
  movieFavorite: (ResponseMovieId | ResponseSeriesId)[] = [];

  constructor(private fs: FavoriteService) {}
  ngOnInit(): void {
    this.fs.getFavorite().subscribe((movie) => {
      this.movieFavorite = movie.map((movie) => movie.movie)
    });
  }
}
