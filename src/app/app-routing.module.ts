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
import { authGuard } from './guards/auth.guard';
import { isLoggedGuard } from './guards/is-logged.guard';
import { JwtExpiredComponent } from './components/jwt-expired/jwt-expired.component';

const routes: Routes = [
  { path: 'home-page', component: StartComponent, canActivate:[isLoggedGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  { path: 'my-list', component: MyListComponent, canActivate: [authGuard] },
  { path: 'movies', component: MovieComponent, canActivate: [authGuard] },
  { path: 'series', component: SeriesComponent, canActivate: [authGuard] },
  {
    path: 'movie-details/:id',
    component: MovieDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'series-details/:id',
    component: SeriesDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'video/:key',
    component: VideoComponent,
    canActivate: [authGuard],
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
  {
    path: 'collections/:company',
    component: CollectionsComponent,
    canActivate: [authGuard],
  },
  {path:'jwt-expired', component:JwtExpiredComponent},
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
