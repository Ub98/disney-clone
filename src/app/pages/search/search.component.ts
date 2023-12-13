import { Component, HostListener, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  inputSearch!: string ;
  page: number = 1;
  movies: Movie[] = [];

  constructor(private ms: MovieService) {}
  ngOnInit(): void {
    this.ms.getMovieData().subscribe((data) => {this.movies = data.results});
  }

  search(inputSearch: string) {
    this.inputSearch = inputSearch;
    this.page = 1;
    this.movies = [];
    this.getSearchMovie();
  }

  getSearchMovie() {
    this.ms.getMovieBySearch(this.inputSearch, this.page).subscribe((movie) => {
      this.movies = [...this.movies, ...movie.results];
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.page++;
      this.getSearchMovie();
    }
  }
}
