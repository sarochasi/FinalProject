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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private mediaService: MediaService,
    private commentService: PlaylistcommentService

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

        this.playlists = playlists.map(playlist => ({
          ...playlist,
          showCommentSection: true
        }));

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


}
