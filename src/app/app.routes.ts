import { Routes } from '@angular/router';
import { FavoriteAnimeComponent } from './features/pages/favorite.anime/favorite.anime.component';
import { HomeComponent } from './features/pages/home/home.component';
import { NoFoundComponent } from './features/pages/no.found/no.found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favorites-animes', component: FavoriteAnimeComponent },
  { path: '**', component: NoFoundComponent },
];
