import { AuthService } from './../../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {

  title = "Playlists"

  playlists: Playlist[] = [];
  user: User = new User();

  newPlaylist: Playlist = new Playlist();
  editPlaylist: Playlist | null = null;
  selected: Playlist | null = null;

  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}

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

  addPlaylist(newPlaylist: Playlist) : void {
    this.playlistService.create(newPlaylist).subscribe({
      next: (newPlaylist) => {
        this.loadPlaylists();
        this.newPlaylist = new Playlist();
      },
      error: (err) => {
        console.error(err);
        console.error("error in subscribe");
      }
    });

  }

  updatePlaylist(editPlaylist: Playlist) : void {
   this.playlistService.update(editPlaylist).subscribe({
    next: (playlist) => {
      this.loadPlaylists();
      this.selected = null;
    },
    error: (err) => {
      console.error(err);
      console.error("error in subscribe");
    }
   });
  }

  deletePlaylist(id: number) : void{
    this.playlistService.destroy(id).subscribe({
      next: () => {
        this.loadPlaylists();
      },
      error: (err) => {
        console.error(err);
        console.error("error in subscribe");
      }
    });
  }

  isAdmin(user: User) : boolean {
    return this.user.role === 'admin';
  }

}
