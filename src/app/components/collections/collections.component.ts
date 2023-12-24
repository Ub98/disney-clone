import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { SearchService } from '../../services/search.service';
import { Search } from '../../models/search';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent implements OnInit {
  movies: Search[] = [];
  movies2: Search[] = [];
  opacityValue: number = 1;
  company!: string;
  loading: boolean = true

  constructor(private searchService: SearchService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.company = this.route.snapshot.paramMap.get('company') ?? '';
    if (this.company) {
      this.searchService.getSearch(this.company, 1).subscribe((data) => {
        this.movies = data.results;
      });
      this.searchService.getSearch(this.company, 2).subscribe((data) => {
        this.movies2 = data.results;
        this.loading = false
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollPosition = window.scrollY;
    this.opacityValue = 1 - scrollPosition / 500;
  }

  slideConfig = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: false,
    autoplay: false,
    autoplaySpeed: 4000,
    centerMode: true,
    centerPadding: 'calc(3.5vw + 14px) 40px ',
    initialSlide: 2,
    speed: 300,
    responsive: [
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 4,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
}
