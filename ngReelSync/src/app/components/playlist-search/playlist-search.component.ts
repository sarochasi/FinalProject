import { Component } from '@angular/core';
import { Playlist } from '../../models/playlist';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../services/playlist.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-playlist-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlist-search.component.html',
  styleUrl: './playlist-search.component.css'
})
export class PlaylistSearchComponent {

  keyword1 = '';
  keyword2 = '';
  playlists: Set<Playlist> | null = null;
  errorMessage: string | null = null;

  constructor(private playlistService: PlaylistService) {}

  searchPlaylists() {
    this.playlistService.searchPlaylists(this.keyword1, this.keyword2).subscribe({
      next: (data) => {
        this.playlists = data;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = error;
        this.playlists = null;
      }
    });
  }
}
