import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from './components/logout/logout.component';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { MediaComponent } from './components/media/media.component';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { PlaylistComponent } from './components/playlist/playlist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent, LoginComponent,
    LogoutComponent, NavigationComponent, MediaComponent, SidebarComponent, PlaylistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngReelSync';

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.tempTestDeleteMeLater(); // DELETE LATER!!!
  }

  tempTestDeleteMeLater() {
    this.auth.login('test','test').subscribe({ // change username to match DB
      next: (data) => {
        console.log('Logged in:');
        console.log(data);
      },
      error: (fail) => {
        console.error('Error authenticating:')
        console.error(fail);
      }
    });
  }
}
