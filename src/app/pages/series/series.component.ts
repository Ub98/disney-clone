import { Component, HostListener, OnInit } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/genres';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent {
  genres: Genre[] = [];
  movies: Movie[] = [];
  page: number = 1;
  genreValue?: any;
  loading: boolean = true

  constructor(private gs: GenreService, private ms: MovieService) {}
  ngOnInit(): void {
    this.gs.getGenreSerie().subscribe((genre) => {
      this.genres = genre.genres;
    });

    this.getSerie();
  }

  change(event: any) {
    this.genreValue = event.target.value;
    this.page = 1;
    this.movies = []
    this.getSerie();
  }

  getSerie() {
    this.gs.getSerieByGenre(this.genreValue, this.page).subscribe((movie) => {
      this.movies = [...this.movies, ...movie.results];
      this.loading = false
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.page++;
      this.getSerie()
    }
  }
}
