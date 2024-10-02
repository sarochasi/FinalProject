import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';

import { MediaComponent } from './components/media/media.component';

import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistdetailComponent } from './components/playlistdetail/playlistdetail.component';
import { ClubComponent } from './components/club/club.component';



export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/admin', component: RegisterComponent},
  {path: 'media', component: MediaComponent},
  {path: 'playlists', component: PlaylistComponent},
  {path: 'playlists/:id', component: PlaylistdetailComponent},
  {path: 'clubs', component: ClubComponent},


  { path: '', redirectTo: '/playlists', pathMatch: 'full' }
];
