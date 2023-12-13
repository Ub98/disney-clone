import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrl: './carousel-home.component.scss'
})
export class CarouselHomeComponent implements OnInit{
  // slides = [
  //   { img: '../../assets/images/slider-badag.jpg' },
  //   { img: '../../assets/images/slider-badging.jpg' },
  //   { img: '../../assets/images/slider-scale.jpg' },
  //   { img: '../../assets/images/slider-scales.jpg' },
  // ];
  slideConfig = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,
    centerPadding: 'calc(3.5vw + 24px) 40px',
  };

  movies: Movie[] = [];
  constructor(private ms: MovieService) {}

  ngOnInit(): void {
    this.ms.getMovieData().subscribe((movie) => {this.movies = movie.results});
  }
}
