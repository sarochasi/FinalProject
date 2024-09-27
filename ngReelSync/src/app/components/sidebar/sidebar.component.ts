import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { LogoutComponent } from "../logout/logout.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "../login/login.component";
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, LogoutComponent, CommonModule, FormsModule, LoginComponent, NgbModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
