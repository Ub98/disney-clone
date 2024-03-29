import { Component, HostListener } from '@angular/core';
import { ResponseMovieId } from '../../models/movie';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { ResponseSeriesId, Series } from '../../models/series';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrl: './series-details.component.scss',
})
export class SeriesDetailsComponent {
  series!: ResponseSeriesId;
  similar: Series[] = [];
  opacityValue: number = 1;
  video!: Video[];
  trailerKey!: string;
  loading: boolean = true;
  movieId!: number;
  mediaType: string = 'tv';
  isFavorite!: boolean;
  idFavoriteMovieServer!: number[];

  constructor(
    private ss: SeriesService,
    private route: ActivatedRoute,
    private vs: VideoService,
    private router: Router,
    private fs: FavoriteService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.movieId = Number(id);

      if (id) {
        this.ss.getSeriesById(Number(id)).subscribe((data) => {
          this.series = data;
          this.fs.isMovieFavorite(this.series).subscribe((response) => {
            this.isFavorite = response;
            if (response) {
              this.fs
                .getIdFavoriteServer(this.series)
                .subscribe((idFavorite) => {
                  this.idFavoriteMovieServer = idFavorite;
                });
            }
          });
        });
        this.ss.getSimilarById(Number(id)).subscribe((serie) => {
          this.similar = serie.results;
          this.loading = false;
        });
        this.vs.getVideoSeries(Number(id)).subscribe((video) => {
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
    this.trailerKey = this.video[0].key;
    this.router.navigate(['/video', this.trailerKey]);
  }

  addFavorite(movie: ResponseMovieId | ResponseSeriesId) {
    this.fs
      .addFavorite(this.movieId, movie, this.mediaType)
      .subscribe();
    this.isFavorite = !this.isFavorite;
  }

  deleteFavorite() {
    this.fs.deleteFavorite(this.idFavoriteMovieServer[0]).subscribe()
    this.isFavorite = !this.isFavorite
  }
}
