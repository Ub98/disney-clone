import { Component, HostListener, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { SearchService } from '../../services/search.service';
import { Search } from '../../models/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  inputSearch!: string;
  page: number = 1;
  movies: Movie[] = [];
  searchData: Search[] = []
  loading:boolean= true

  constructor(private ms: MovieService, private searchService: SearchService) {}
  ngOnInit(): void {
    this.getMovieData()
  }

  getMovieData() {
    this.ms.getMovieData(this.page).subscribe((data) => {
      this.movies = [...this.movies, ...data.results];
      this.loading = false
    });
  }

  search(inputSearch: string) {
    this.inputSearch = inputSearch;
    this.page = 1;
    this.movies = [];
    if (!this.inputSearch) {
      this.getMovieData();
    } else {
      this.getSearch();
    }
  }

  getSearch() {
    this.searchService.getSearch(this.inputSearch, this.page).subscribe((movie) => {
      this.searchData = movie.results;
    });
  }

  pushSearch() {
    this.searchService.getSearch(this.inputSearch, this.page).subscribe((movie) => {
      this.searchData = [...this.searchData, ...movie.results];
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.page++;
      if (this.inputSearch) {
        this.pushSearch();
      } else {
        this.getMovieData();
      }
    }
  }
}
