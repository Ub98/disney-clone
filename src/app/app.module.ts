import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SearchComponent } from './pages/search/search.component';
import { SeriesComponent } from './pages/series/series.component';
import { BtnCategoryHomeComponent } from './components/btn-category-home/btn-category-home.component';
import { CarouselHomeComponent } from './components/carousel-home/carousel-home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderMovieComponent } from './components/slider-movie/slider-movie.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    MyListComponent,
    NotFoundComponent,
    SearchComponent,
    SeriesComponent,
    BtnCategoryHomeComponent,
    CarouselHomeComponent,
    NavbarComponent,
    SliderMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
