import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { MovieComponent } from './pages/movie/movie.component';
import { SeriesComponent } from './pages/series/series.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { VideoComponent } from './components/video/video.component';
import { StartComponent } from './pages/start/start.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EnterEmailComponent } from './components/enter-email/enter-email.component';
import { EnterPasswordComponent } from './components/enter-password/enter-password.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'my-list', component: MyListComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'series', component: SeriesComponent },
  {
    path: 'movie-details/:id',
    component: MovieDetailsComponent,
  },
  {
    path: 'series-details/:id',
    component: SeriesDetailsComponent,
  },
  {
    path: 'video/:key',
    component: VideoComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: 'enter-email', pathMatch: 'full' },
      { path: 'enter-email', component: EnterEmailComponent },
      { path: 'enter-password', component: EnterPasswordComponent },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'collections/:company', component: CollectionsComponent },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
