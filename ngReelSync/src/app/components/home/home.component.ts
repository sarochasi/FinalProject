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
  // newComment: PlaylistComment = new PlaylistComment();
  showCommentSection = false;

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

  // addComment(newComment: PlaylistComment, playlistId: number): void {
  //   this.commentService.create(playlistId, newComment).subscribe({
  //     next: (createdComment) => {
  //       const commentId = createdComment.id;


  //       this.addCommentToPlaylist(playlistId, commentId);
  //     },
  //     error: (err) => {
  //       console.error('Error creating comment:', err);
  //     },
  //   });
  // }

  // addCommentToPlaylist(playlistId: number, commentId: number): void {
  //   this.playlistService.addCommentToPlaylist(playlistId, commentId).subscribe({
  //     next: (updatedPlaylist) => {
  //       console.log('Comment added to playlist successfully:', updatedPlaylist);
  //       this.reloadComment();
  //     },
  //     error: (err) => {
  //       console.error('Error adding comment to playlist:', err);
  //     }
  //   });
  // }

  reloadComment() {
    this.commentService.index().subscribe({
      next: (commentList) => {
        this.commentList = commentList;
      },
      error: (fail) => {
        console.error('CommentComponent.reloadComment: error retrieving list');
        console.error(fail);
      }
    });
  }

  // submitCommentToPlaylist(): void {
  submitCommentToPlaylist(playlistId: number, form: NgForm): void {

    // if (this.selected) {
      // this.commentInputs.forEach((commentInputs) => {
        // const newComment = new PlaylistComment();
        // newComment.content = commentInputs.content;
        console.log(form);
        console.log(form.value);


        const newComment = form.value;

        this.commentService.create(playlistId, newComment).subscribe({
          next: (createdComment) => {
            const commentId = createdComment.id;
            // this.addCommentToPlaylist(this.selected!.id, commentId);
          },
          error: (err) => {
            console.error('Error creating comment:', err);
          }
        });
      // );
      // });
    // }

    // this.commentInputs = [{ content: '', createdAt: ''}];
    // this.toggleCommentSection();
  }



  toggleCommentSection(): void {
    this.showCommentSection = !this.showCommentSection;
  }


}
