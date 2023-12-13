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
    this.getSearchMovie(this.inputSearch)
  }

  getSearchMovie(inputSearch: string) {
    this.ms.getMovieBySearch(inputSearch, this.page).subscribe((movie) => {
      this.movies = movie.results;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.page++;
     
    }
  }
}
