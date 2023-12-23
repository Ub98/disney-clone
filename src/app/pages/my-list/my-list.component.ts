import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { ResponseMovieId } from '../../models/movie';
import { ResponseSeriesId } from '../../models/series';
import { Favorite } from '../../models/favorite';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss',
})
export class MyListComponent implements OnInit {
  favorites: Favorite[] = []

  constructor(private fs: FavoriteService) {}
  ngOnInit(): void {
    this.fs.getFavorite().subscribe((movie) => {
      this.favorites = movie            
    });
  }
}
