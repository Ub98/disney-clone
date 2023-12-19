import { Component, HostListener } from '@angular/core';
import { Movie, ResponseMovieId } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { ResponseSeriesId, Series } from '../../models/series';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrl: './series-details.component.scss',
})
export class SeriesDetailsComponent {
  series?: ResponseSeriesId;
  similar: Series[] = [];
  opacityValue: number = 1;
  video!: Video[];
  trailerKey!: string;

  constructor(
    private ss: SeriesService,
    private route: ActivatedRoute,
    private vs: VideoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ss.getSeriesById(Number(id)).subscribe((data) => {
        this.series = data;
      });
      this.ss.getSimilarById(Number(id)).subscribe((serie) => {
        this.similar = serie.results;
      });
      this.vs.getVideoSeries(Number(id)).subscribe((video) => {
        this.video = video.results;
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
}
