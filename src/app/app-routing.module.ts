import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { MovieComponent } from './pages/movie/movie.component';
import { SeriesComponent } from './pages/series/series.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'search', component: SearchComponent},
  {path:'my-list', component: MyListComponent},
  {path:'movie', component: MovieComponent},
  {path:'series', component: SeriesComponent},
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
