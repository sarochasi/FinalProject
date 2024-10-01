import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../../models/playlist';
import { User } from '../../models/user';
import { ClubService } from '../../services/club.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Club } from '../../models/club';
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
  newPlaylist: Playlist = new Playlist();

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

}
