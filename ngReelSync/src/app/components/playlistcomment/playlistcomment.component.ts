import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Playlist } from '../../models/playlist';
import { User } from '../../models/user';
import { Playlistcomment } from '../../models/playlistcomment';
import { AuthService } from '../../services/auth.service';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playlistcomment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlistcomment.component.html',
  styleUrl: './playlistcomment.component.css'
})
export class PlaylistcommentComponent {

  playlists: Playlist[] = [];
  user: User = new User();
  selected: Playlist | null = null;
  commentList: Playlistcomment[] = [];

  commentInputs: {
    content: string;
  }[] = [
    {content: ''}
  ];

  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) {}

  isLoggedIn(): boolean {
    return this.authService.checkLogin();
  }

}
