import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginUser: User = new User();

  constructor(
    private auth: AuthService,
    private router: Router
  ){

  }

  login(user: User){
    console.log(user);
    this.auth.login(user.username, user.password).subscribe({
      next: (loggedInUser) => {
      this.router.navigateByUrl('/playlists');
      },
      error: (problem) => {
        console.error('LogInComponent.login(): Error logging in user:');
        console.error(problem);
        this.router.navigateByUrl('/login');
      }
    });
  }
}
