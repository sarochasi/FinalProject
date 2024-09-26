import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  logout(): void{
    console.log("logout");
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
}
