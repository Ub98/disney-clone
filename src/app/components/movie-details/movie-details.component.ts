import { Component, HostListener } from '@angular/core';
import { Movie, ResponseMovieId } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';
import { FavoriteService } from '../../services/favorite.service';
import { Search } from '../../models/search';
import { ResponseSeriesId } from '../../models/series';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent {
  movie?: ResponseMovieId;
  similar: Movie[] = [];
  opacityValue: number = 1;
  video!: Video[];
  trailerKey!: string;
  loading: boolean = true
  movieId!: number
  mediaType:string = 'movie'

  constructor(
    private ms: MovieService,
    private route: ActivatedRoute,
    private vs: VideoService,
    private router: Router,
    private fs: FavoriteService
  ) {}
  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.movieId = Number(id)
      if (id) {
        this.ms.getMovieById(Number(id)).subscribe((data) => {
          this.movie = data;
        });
        this.ms.getSimilarById(Number(id)).subscribe((movie) => {
          this.similar = movie.results;
          this.loading = false
        });
        this.vs.getVideoMovie(Number(id)).subscribe((video) => {
          this.video = video.results;
        });
      }
    });
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
    centerPadding: '0 40px ',
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

  onClickTrailer() {
    const trailer = this.video.find(
      (result) => result.name === 'Official Trailer'
    );
    if (trailer) {
      this.trailerKey = trailer.key;
    } else {
      this.trailerKey = this.video[0].key;
    }

    this.router.navigate(['/video', this.trailerKey]);
  }

  addFavorite(movie: ResponseMovieId | ResponseSeriesId){
    this.fs.addFavorite(this.movieId, movie, this.mediaType).subscribe(movie=> console.log("add")
    )
  }
}
