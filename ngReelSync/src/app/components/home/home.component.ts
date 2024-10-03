import { PlaylistComment } from './../../models/playlistcomment';
import { Component } from '@angular/core';
import { Playlist } from '../../models/playlist';
import { User } from '../../models/user';
import { Media } from '../../models/media';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MediaService } from '../../services/media.service';
import { CommonModule } from '@angular/common';
import { PlaylistcommentService } from '../../services/playlistcomment.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginComponent } from "../login/login.component";
import { ChangeService } from '../../services/change.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  playlists: Playlist[] = [];
  user: User = new User();

  selected: Playlist | null = null;
  mediaList: Media[] = [];

  playlistComment: PlaylistComment[] = [];
  commentList: PlaylistComment[] = [];
  showCommentSection = true;

  curatorPlaylists: Playlist[] = [];
  favoritePlaylists: Playlist[] = [];

  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private mediaService: MediaService,
    private commentService: PlaylistcommentService,
    private changeService: ChangeService

  ) {}

  commentInputs: {
    content: string;
    createdAt: string;
  }[] = [
    { content: '', createdAt: ''}
  ];

  isLoggedIn(): boolean {
    return this.authService.checkLogin();
  }

  ngOnInit(): void {
    this.loadPlaylists();
    this.fetchPlaylists();
    this.loadCuratorsPlaylists();
    this.updateFavoritePlaylists();
    this.authService.getLoggedInUser().subscribe({
      next: (loggedInUser) => {
        this.user = loggedInUser;
      },
      error: (err) => {
        console.error('Error fetching logged-in user:', err);
      }
    });
    this.playlists.forEach((playlist) => {
      this.getCommentsForPlaylist(playlist.id);
    });

  }


  fetchPlaylists(): void {
    this.playlistService.showAll().subscribe({
      next: (playlists) => {
        // Map and sort playlists by createdAt date in descending order
        this.playlists = playlists
          .map(playlist => ({
            ...playlist,
            showCommentSection: true
          }))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Reload comments for each playlist
        this.playlists.forEach(playlist => {
          this.reloadComments(playlist.id);
        });
      },
      error: (err) => {
        console.error('Error fetching playlists:', err);
      }
    });
  }



  loadPlaylists() : void {
    this.playlistService.showAll().subscribe({
      next: (playlists) => {
        this.playlists = playlists.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        // this.playlists = playlists;
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

  getCommentsForPlaylist(playlistId: number): void {
    this.playlistService.getCommentsForPlaylist(playlistId).subscribe({
      next: (comments) => {
        const playlist = this.playlists.find(p => p.id === playlistId);
        if (playlist) {
          playlist.playlistComments = comments;
        }
      },
      error: (err) => {
        console.error('Error fetching comments for playlist:', err);
      }
    });
  }

  reloadComments(playlistId: number): void {
    this.commentService.getCommentsForPlaylist(playlistId).subscribe({
      next: (comments) => {

        const playlist = this.playlists.find(p => p.id === playlistId);
        if (playlist) {
          playlist.playlistComments = comments;
        }
      },
      error: (err) => {
        console.error('Error reloading comments:', err);
      }
    });
  }


  submitCommentToPlaylist(playlistId: number, form: NgForm): void {
    if (form.valid) {
      const newComment = form.value;
      this.commentService.create(playlistId, newComment).subscribe({
        next: () => {

          this.reloadComments(playlistId);
          form.reset();
        },
        error: (err) => {
          console.error('Error adding comment:', err);
        }
      });
    }
  }

  toggleCommentSection(): void {

    this.showCommentSection = !this.showCommentSection;
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
    //subscribe to GET /api/playlists/favorites
    // this.favoritePlaylists = this.playlists.filter((playlist) => playlist.favorite);
    this.playlistService.loadFavorites().subscribe({
      next: (favorites) => {
        this.favoritePlaylists = favorites;
        this.changeService.makeChange();
      },
      error: (err) => console.error('Error updating favorite status:', err),
    })
  }

  isFavorite(playlist: Playlist): boolean {
    return playlist && this.favoritePlaylists.some((pl) => {return pl.id === playlist.id})
  }


}
