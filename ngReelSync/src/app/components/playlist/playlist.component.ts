import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { Media } from '../../models/media';
import { MediaService } from '../../services/media.service';
import { PlaylistSearchComponent } from "../playlist-search/playlist-search.component";
import { LoginComponent } from "../login/login.component";
import { ChangeService } from '../../services/change.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule, PlaylistSearchComponent, LoginComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {

  title = "Playlists"

  playlists: Playlist[] = [];
  user: User = new User();

  newPlaylist: Playlist = new Playlist();
  favoritePlaylists: Playlist[] = [];
  editPlaylist: Playlist | null = null;
  selected: Playlist | null = null;
  showForm = false;

  mediaList: Media[] = [];
  showMediaForm = false;
  newMedia: Media = new Media();

  curatorPlaylists: Playlist[] = [];

  mediaInputs: {
    sourceUrl: string;
    name: string;
    description: string;
  }[] = [
    { sourceUrl: '', name: '', description: '' }
  ];
  selectedPlaylistId: number | null = null;

  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private mediaService: MediaService,
    private cdRef: ChangeDetectorRef,
    private changeService: ChangeService
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

  addMedia(newMedia: Media): void {
    this.mediaService.create(newMedia).subscribe({
      next: (createdMedia) => {
        this.reloadMedia();
        this.newMedia = new Media();
      },
      error: (err) => {
        console.error('Error creating media:', err);
      },
    });
  }

  addMediaToPlaylist(playlistId: number, mediaId: number, media: Media): void {
    this.playlistService.addMediaToPlaylist(playlistId, mediaId, media).subscribe({
      next: (updatedPlaylist) => {
        console.log('Media added to playlist successfully:', updatedPlaylist);
        this.reloadMedia();
      },
      error: (err) => {
        console.error('Error adding media to playlist:', err);
      }
    });
  }

  showPlaylistMedia(): void {
    this.mediaService.index().subscribe({
      next: (media) => {
        console.log('Media loaded sucessfully', media);
        this.reloadMedia();
      },
      error: (err) => {
        console.log("Error loading media in showPlaylistMedia() :" + err);
      }
    })
  }

  viewPlaylistDetail(playlistId: number): void {
    this.router.navigate(['/playlists', playlistId]);
  }

  submitMediaToPlaylist(): void {
    if (this.selected) {
      this.mediaInputs.forEach((mediaInput) => {
        const newMedia = new Media();
        newMedia.sourceUrl = mediaInput.sourceUrl;

        this.mediaService.create(newMedia).subscribe({
          next: (createdMedia) => {
            const mediaId = createdMedia.id;
            this.addMediaToPlaylist(this.selected!.id, mediaId, newMedia);
          },
          error: (err) => {
            console.error('Error creating media:', err);
          }
        });
      });
    }

    this.mediaInputs = [{ sourceUrl: '', name: '', description: '' }];
    this.toggleMediaForm();
  }

  toggleMediaForm() {
    this.showMediaForm = !this.showMediaForm;
  }


  addMoreInputs() {
    this.mediaInputs.push({ sourceUrl: '', name: '', description: '' });
  }

  loadPlaylists() : void {
    this.playlistService.index().subscribe({
      next: (playlists) => {

        // this.playlists = playlists;
        this.playlists = playlists.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        this.updateFavoritePlaylists();
      },
      error: (err) => {
        console.error(err);
        console.error("Error loading playlists");
      }
    });

  }

  findPlaylistById(playlistId: number) : void {
    this.playlistService.show(playlistId).subscribe({
      next: (playlist) => {
        this.selected = playlist;
        this.cdRef.detectChanges();

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

  isFavorite(playlist: Playlist): boolean {
    return playlist && this.favoritePlaylists.some((pl) => {return pl.id === playlist.id})
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

  addToFavorites(playlist: Playlist): void {
    this.playlistService.addToFavorites(playlist.id).subscribe({
      next: (updatedPlaylist) => {
        playlist.favorite = updatedPlaylist.favorite;
        this.updateFavoritePlaylists();
      },
      error: (err) => console.error('Error updating favorite status:', err),
    });
  }

  removeFromFavorites(playlist: Playlist): void {
    this.playlistService.removeFromFavorites(playlist.id).subscribe({
      next: (updatedPlaylist) => {
        playlist.favorite = false;
        this.updateFavoritePlaylists();
      },
      error: (err) => console.error('Error updating favorite status:', err),
    })
  }

  updateFavoritePlaylists(): void {
    this.playlistService.loadFavorites().subscribe({
      next: (favorites) => {
        this.favoritePlaylists = favorites;
        this.changeService.makeChange();
      },
      error: (err) => console.error('Error updating favorite status:', err),
    })
  }

  loadCuratorsPlaylists() : void {
    this.playlistService.showAllCuratorsPlaylists().subscribe({
      next: (playlists) => {
        this.curatorPlaylists = playlists.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

      },
      error: (err) => {
        console.error(err);
        console.error("Error loading playlists");
      }
    });

  }

}
