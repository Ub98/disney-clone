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
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CollectionsComponent } from './components/collections/collections.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { VideoComponent } from './components/video/video.component';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './components/footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { StartComponent } from './pages/start/start.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EnterEmailComponent } from './components/enter-email/enter-email.component';
import { EnterPasswordComponent } from './components/enter-password/enter-password.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

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
    SliderMovieComponent,
    MovieDetailsComponent,
    CollectionsComponent,
    SeriesDetailsComponent,
    VideoComponent,
    LoaderComponent,
    FooterComponent,
    StartComponent,
    LoginComponent,
    RegisterComponent,
    EnterEmailComponent,
    EnterPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
