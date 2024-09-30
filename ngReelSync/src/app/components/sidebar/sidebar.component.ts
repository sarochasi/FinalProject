import { Component, effect, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LogoutComponent } from "../logout/logout.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "../login/login.component";
import { PlaylistComponent } from "../playlist/playlist.component";
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist';
import { User } from '../../models/user';
import { ChangeService } from '../../services/change.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, LogoutComponent, CommonModule, FormsModule, LoginComponent, NgbModule, PlaylistComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {

  playlists: Playlist[] = [];
  favoritePlaylists: Playlist[] = [];
  user: User = new User();
  selected: Playlist | null = null;

  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private changeService: ChangeService){
      effect(() => {
        console.log(changeService.changeMade());
        this.updateFavoritePlaylists();
      })
    }

    isLoggedIn(): boolean {
      return this.authService.checkLogin();
    }

    ngOnInit(): void {
      this.loadPlaylists();
      this.updateFavoritePlaylists();
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
          console.error("Error loading playlists");
        }
      });

    }

    isOwner(playlist: Playlist): boolean {
      return playlist && this.user.id === playlist.creatorId;
    }


    findPlaylistById(playlistId: number) : void {
      this.playlistService.show(playlistId).subscribe({
        next: (playlist) => {
          this.selected = playlist;
        },
        error: (err) => {
          this.router.navigateByUrl('notFound');
          console.error(err);
          console.error("error in subscribe for finding playlist by id");
        }
      });
    }

    updateFavoritePlaylists(): void {
      //subscribe to GET /api/playlists/favorites
      // this.favoritePlaylists = this.playlists.filter((playlist) => playlist.favorite);
      this.playlistService.loadFavorites().subscribe({
        next: (favorites) => {
          this.favoritePlaylists = favorites;
        },
        error: (err) => console.error('Error updating favorite status:', err),
      })
    }

}
