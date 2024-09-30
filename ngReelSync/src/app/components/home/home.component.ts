import { Component } from '@angular/core';
import { PlaylistComponent } from "../playlist/playlist.component";
import { Playlist } from '../../models/playlist';
import { User } from '../../models/user';
import { Media } from '../../models/media';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MediaService } from '../../services/media.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  playlists: Playlist[] = [];
  user: User = new User();
  selected: Playlist | null = null;
  mediaList: Media[] = [];
  playlistComment: PlaylistComponent[] = [];

  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private mediaService: MediaService,

  ) {}

  isLoggedIn(): boolean {
    return this.authService.checkLogin();
  }

  ngOnInit(): void {
    this.loadPlaylists();
    this.authService.getLoggedInUser().subscribe({
      next: (loggedInUser) => {
        this.user = loggedInUser;
      },
      error: (err) => {
        console.error('Error fetching logged-in user:', err);
      }
    });
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let playlistIdStr = params.get("playlistId");
        if (playlistIdStr) {
          let playlistId = parseInt(playlistIdStr);
          if (isNaN(playlistId)) {
            this.router.navigateByUrl('notFound');
          } else {
            this.findPlaylistById(playlistId);
          }
        }
      }
    });
  }

  loadPlaylists() : void {
    this.playlistService.index().subscribe({
      next: (playlists) => {
        this.playlists = playlists;
      },
      error: (err) => {
        console.error(err);
        console.error("error in subscribe");
      }
    });
  }

  findPlaylistById(playlistId: number) : void {
    this.playlistService.show(playlistId).subscribe({
      next: (playlist) => {
        this.selected = playlist;
      },
      error: (err) => {
        this.router.navigateByUrl('notFound');
        console.error(err);
        console.error("error in subscribe for finding todo by id");
      }
    });
  }

  viewPlaylistDetail(playlistId: number): void {
    this.router.navigate(['/playlists', playlistId]);
  }

}
