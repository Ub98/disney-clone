import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-slider-movie',
  templateUrl: './slider-movie.component.html',
  styleUrl: './slider-movie.component.scss',
})
export class SliderMovieComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private ms: MovieService) {}

  ngOnInit(): void {
    this.ms.getMovieData().subscribe((data) => {this.movies = data.results});
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
        breakpoint: 768,
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
