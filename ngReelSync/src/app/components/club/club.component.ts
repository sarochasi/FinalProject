import { Club } from './../../models/club';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  playlists: Playlist[] =[];
  user: User = new User();
  clubMembers: User[] = [];

  newClub: Club = new Club();
  // newPlaylist: Playlist = new Playlist();

  showForm = false;

  constructor(private clubService: ClubService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
  ){}

  isLoggedIn(): boolean {
    return this.authService.checkLogin();
  }

  ngOnInit(): void{
    this.loadClub();
    this.loadLoggedInUser();

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

  isJoined(club: Club): boolean {
    console.log(club.clubUsers.some((member) => {return member.id === this.user.id}));
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


}
