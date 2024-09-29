import { AuthService } from './../../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { Media } from '../../models/media';
import { MediaService } from '../../services/media.service';
import { PlaylistSearchComponent } from "../playlist-search/playlist-search.component";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule, PlaylistSearchComponent],
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

  mediaList: Media[] = [];
  showMediaForm = false;
  newMedia: Media = new Media();
  mediaInputs: { sourceUrl: string }[] = [{ sourceUrl: '' }];
  selectedPlaylistId: number | null = null;

  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private mediaService: MediaService
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


  reloadMedia() {
    this.mediaService.index().subscribe({
      next: (mediaList) => {
        this.mediaList = mediaList;
      },
      error: (fail) => {
        console.error('MediaComponent.reloadMedia: error retrieving list');
        console.error(fail);
      }
    });
  }

  addMedia(newMedia: Media, playlistId: number): void {
    this.mediaService.create(newMedia).subscribe({
      next: (createdMedia) => {
        const mediaId = createdMedia.id; // Get media ID after creation

        // Now associate the media with the playlist
        this.addMediaToPlaylist(playlistId, mediaId);
      },
      error: (err) => {
        console.error('Error creating media:', err);
      },
    });
  }

  // Adds the created media to a specific playlist
  addMediaToPlaylist(playlistId: number, mediaId: number): void {
    this.playlistService.addMediaToPlaylist(playlistId, mediaId).subscribe({
      next: (updatedPlaylist) => {
        console.log('Media added to playlist successfully:', updatedPlaylist);
        this.reloadMedia();
      },
      error: (err) => {
        console.error('Error adding media to playlist:', err);
      }
    });
  }

  submitMediaToPlaylist(): void {
    if (this.selected) {
      this.mediaInputs.forEach((mediaInput) => {
        const newMedia = new Media();
        newMedia.sourceUrl = mediaInput.sourceUrl;

        this.mediaService.create(newMedia).subscribe({
          next: (createdMedia) => {
            const mediaId = createdMedia.id; // Assume createdMedia has the id
            // Add each created media to the playlist
            this.addMediaToPlaylist(this.selected!.id, mediaId);
          },
          error: (err) => {
            console.error('Error creating media:', err);
          }
        });
      });
    }
    // Reset the form after submission
    this.mediaInputs = [{ sourceUrl: '' }];
    this.toggleMediaForm(); // Close the form
  }

  toggleMediaForm() {
    this.showMediaForm = !this.showMediaForm;
  }

  // Adds new input fields dynamically
  addMoreInputs() {
    this.mediaInputs.push({ sourceUrl: '' });
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
    newPlaylist.creatorId = this.user.id;
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

  togglePlaylistEnabled(playlistId: number): void {
    this.playlistService.getPlaylistById(playlistId).subscribe({
      next: (playlist) => {
        playlist.enabled = !playlist.enabled;

        this.playlistService.update(playlist).subscribe({
          next: (updatedPlaylist) => {
            console.log('Playlist updated successfully:', updatedPlaylist);
            this.loadPlaylists();
          },
          error: (err) => {
            console.error('Error updating playlist:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error retrieving playlist:', err);
      }
    });
  }



  isOwner(playlist: Playlist): boolean {
    return playlist && this.user.id === playlist.creatorId;
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
}
