import { Component, HostListener, OnInit } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/genres';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent implements OnInit {
  genres: Genre[] = [];
  movies: Movie[] = [];
  page: number = 1;
  genreValue?: any;

  constructor(private gs: GenreService, private ms: MovieService) {}
  ngOnInit(): void {
    this.gs.getGenreMovie().subscribe((genre) => {
      this.genres = genre.genres;
    });

    this.getMovie();
  }

  change(event: any) {
    this.genreValue = event.target.value;
    this.page = 1;
    this.movies = []
    this.getMovie();
  }

  getMovie() {
    this.gs.getMovieByGenre(this.genreValue, this.page).subscribe((movie) => {
      this.movies = [...this.movies, ...movie.results];
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.page++;
      this.getMovie()
    }
  }
}
