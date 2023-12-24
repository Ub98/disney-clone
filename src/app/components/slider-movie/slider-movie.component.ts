import { Component, HostListener, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { SeriesService } from '../../services/series.service';
import { Series } from '../../models/series';

@Component({
  selector: 'app-slider-movie',
  templateUrl: './slider-movie.component.html',
  styleUrl: './slider-movie.component.scss',
})
export class SliderMovieComponent implements OnInit {
  movies: Movie[] = [];
  nowPlaying: Movie[] = [];
  topRated: Movie[] = [];
  upComing: Movie[] = [];
  adventureMovie: Movie[] = [];
  animationMovie: Movie[] = [];
  thrillerMovie: Movie[] = [];
  todaySeries: Series[] = [];
  isScrolled: boolean = false;
  loading: boolean = true;

  constructor(private ms: MovieService, private ss: SeriesService) {}

  ngOnInit(): void {
    this.ms.getMovieData(1).subscribe((data) => {
      this.movies = data.results;
    });
    this.ms.getNowPlayingMovie(2).subscribe((movie) => {
      this.nowPlaying = movie.results;
    });
    this.ms.getTopRatedMovie(1).subscribe((movie) => {
      this.topRated = movie.results;
    });
    this.ms.getUpComingMovie(1).subscribe((movie) => {
      this.upComing = movie.results;
    });
    this.ss.getTodaySeries(Math.random() * 8 + 1).subscribe((serie) => {
      this.todaySeries = serie.results;
      this.loading = false;
    });
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
          centerPadding: 'calc(3.5vw + 14px) 30px ',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          initialSlide: 1,
          centerPadding: 'calc(3.5vw + 14px) 20px ',
        },
      },
    ],
  };

  @HostListener('document:scroll', ['$event'])
  onScroll(): void {
    if (
      document.documentElement.clientHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      this.ms.getAdventureMovie(1).subscribe((movie) => {
        this.adventureMovie = movie.results;
      });
      this.ms.getAnimationMovie(1).subscribe((movie) => {
        this.animationMovie = movie.results;
      });
      this.ms.getThrillerMovie(1).subscribe((movie) => {
        this.thrillerMovie = movie.results;
      });
      this.isScrolled = true;
    }
  }
}
