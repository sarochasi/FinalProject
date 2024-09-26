
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoutComponent } from "../logout/logout.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "../login/login.component";


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, LogoutComponent, CommonModule, FormsModule, LoginComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  isCollapsed: boolean = false;

  constructor(
    private auth:AuthService,
    private router: Router
  ){}

  isLoggedIn(): boolean {
    return this.auth.checkLogin();
  }

}
