import { PlaylistService } from './../../services/playlist.service';
import { Club } from './../../models/club';
import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../../models/playlist';
import { User } from '../../models/user';
import { ClubService } from '../../services/club.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent {
  clubs: Club[] = [];
  clubPlaylists: Playlist[] =[];
  playlist: Playlist = new Playlist();
  user: User = new User();
  clubMembers: User[] = [];
  selectedPlaylistId: number | null = null;

  allPlaylists: Playlist[] = [];

  selected: Club | null = null;

  newClub: Club = new Club();

  showForm = false;

  constructor(private clubService: ClubService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private playlistService: PlaylistService
  ){}

  isLoggedIn(): boolean {
    return this.authService.checkLogin();
  }

  ngOnInit(): void{
    this.loadClub();
    this.loadLoggedInUser();
    this.loadPlaylists();
  }
  loadLoggedInUser() {
    this.authService.getLoggedInUser().subscribe({
      next: (loggedInUser) => {
        this.user = loggedInUser;
      },
      error: (err) => {
        console.error('Error fetching logged-in user:', err);
      }
    });
  }

  loadClub() : void {
    console.log('loadclub() called')
    this.clubService.index().subscribe({
      next: (clubs) => {

        this.clubs = clubs;
        console.log("clubs: " + clubs);

      },
      error: (err) => {
        console.error(err);
        console.error("Error loading clubs");
      }
    });

  }

  addClub(newClub: Club) : void {
    newClub.creatorId = this.user.id;
    this.clubService.create(newClub).subscribe({
      next: (newClub) => {
        this.loadClub();
        this.newClub = new Club();
      },
      error: (err) => {
        console.error(err);
        console.error("error in subscribe");
      }
    });

  }

  joinClub(clubId: number): void{
    this.clubService.joinclub(clubId).subscribe({
      next: (club) => {
        console.log('Join club: ', club);
        this.loadClub();
        this.loadLoggedInUser();

      },
      error: (err) =>{
        console.error("Error join club: ", err);
      }
    });
  }

  loadClubMembers(clubId: number): void {
    console.log('Loading memebers for clubId: ' + clubId);
    this.clubService.getClubMembers(clubId).subscribe({
      next: (members) => {
        this.clubMembers = members;
        console.log('Updated club members: ', this.clubMembers);
      },
      error: (err) => {
        console.error('Error loading club members:', err);
      }
    });
  }

  loadClubPlaylists(clubId: number): void {
    console.log('Loading playlists for clubId: ' + clubId);
    this.clubService.getClubPlaylists(clubId).subscribe({
      next: (clubPlaylists) => {
        if (this.selected) {

          this.selected.clubPlaylists = clubPlaylists || [];
          console.log('Updated club playlists: ', this.selected.clubPlaylists);
        }
      },
      error: (err) => {
        console.error('Error loading club playlist:', err);
      }
    });
  }


  isJoined(club: Club): boolean {
    return club && club.clubUsers.some((member) => {return member.id === this.user.id})

  }

  leaveClub(club: Club): void{
    this.clubService.leaveClub(club.id).subscribe({
      next: () => {
        console.log('Successfully left the club');
        this.loadClub();
        this.loadLoggedInUser();

      },
      error: (err) => {
        console.error('Error leaving the club: ', err);
      }
    });
  }

  selectedClub(club: Club): void{
    console.log(club);
    this.selected = club;
    this.loadClubPlaylists(club.id);
    this.loadClubMembers(club.id);
  }


  loadPlaylists(): void {
    console.log("Playlists: " + this.playlistService.index());
    this.playlistService.index().subscribe({
      next: (playlists) => {
        this.allPlaylists = playlists;
      },
      error: (kaboom) => {
        console.log('ClubComponent.loadPlaylists failed');
        console.log(kaboom);
      }
    });
  }



  addPlaylistToClub(): void {

    if (!this.selected || !this.selectedPlaylistId) {
      return;
    }

    const existingPlaylist = this.selected.clubPlaylists.find(
      (playlist) => playlist.id === this.selectedPlaylistId
    );

    if (existingPlaylist) {
      console.log('Playlist already exists in this club');
      alert('This playlist is already added to the club.');
      return;
    }

      this.clubService.addPlaylistToClub(this.selected.id, this.selectedPlaylistId).subscribe({
        next: (updatedClub) => {
          this.selected = updatedClub;
          this.selectedPlaylistId = null;

          this.loadClubPlaylists(this.selected.id);
          console.log('Playlist added to club successfully');
        },
        error: (err) => {
          console.error('Error adding playlist to club:', err);
        }
      });


  }

  getAvailablePlaylists(): Playlist[] {

    if (!this.selected || !this.selected.clubPlaylists) {
      return this.allPlaylists;
    }

    const availablePlaylists: Playlist[] = [];

    for (let i = 0; i < this.allPlaylists.length; i++) {
      let alreadyInClub = false;

      for (let j = 0; j < this.selected.clubPlaylists.length; j++) {
        if (this.allPlaylists[i].id === this.selected.clubPlaylists[j].id) {
          alreadyInClub = true;
          break;
        }
      }
      if (!alreadyInClub) {
        availablePlaylists.push(this.allPlaylists[i]);
      }
    }
    console.log("avialablePlaylists: " + availablePlaylists);
    return availablePlaylists;
  }



}
