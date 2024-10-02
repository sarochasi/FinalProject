import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClubService } from '../../services/club.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist';
import { Club } from '../../models/club';

@Component({
  selector: 'app-clubdetail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clubdetail.component.html',
  styleUrl: './clubdetail.component.css'
})
export class ClubdetailComponent {

  constructor(private clubService: ClubService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private playlistService: PlaylistService

  ) {}

  club: Club | undefined;
  newPlaylist: Playlist = new Playlist();

  ngOnInit(){

  }

  getClubDetails(){
    this.clubService.index().subscribe({
      next: (data) => {
        // this.clubs = data;
      },
      error: (failed) => {
        console.log('getClubDetails() error');
        console.log(failed);
      }
    });

  }

  showClubMembers(cid: number){

  }
}
