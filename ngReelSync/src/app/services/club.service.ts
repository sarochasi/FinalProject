import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Club } from '../models/club';
import { Playlist } from '../models/playlist';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/clubs';

  user: User = new User();

  constructor(private http: HttpClient, private auth: AuthService) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index():Observable<Club[]>{
    return this.http.get<Club[]>(this.url, this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => { return new Error("ClubService.index(): error retrieving clubs:"  + err); }
          );
        }
      )
    );
  }

  getClubById(clubId: number): Observable<Club>{
    return this.http.get<Club>(`${this.url}/${clubId}`, this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => { return new Error("ClubService.index(): error retrieving clubs:"  + err); }
          );
        }
      )
    );
  }

  create(club: Club): Observable<Club>{
    return this.http.post<Club>(this.url, club, this.getHttpOptions()).pipe(
      catchError((err:any) => {
        console.log(err);
        return throwError(
          () => new Error('ClubService.create(): error adding club; ' + err)
        );
      })
    );
  }

  joinclub(cid: number): Observable<Club>{
    return this.http.post<Club>((`${this.url}/${cid}/join`), {}, this.getHttpOptions());
  }

  leaveClub(cid: number): Observable<Club>{
    return this.http.delete<Club>(`${this.url}/${cid}/leave`, this.getHttpOptions()).pipe(
      catchError((err: any) =>
      {
        console.log(err);
        return throwError(() => new Error('ClubService.leaveClub(): error: ' + err));
      })
    );
  }

  getClubMembers(clubId: number): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/${clubId}/members`, this.getHttpOptions()).pipe(
      catchError((err: any) =>
        {
          console.log(err);
          return throwError(() => new Error('ClubService.getClubMembers(): error: ' + err));
        })
    );
  }

  getClubPlaylists(clubId: number): Observable<Playlist[]>{
    return this.http.get<Playlist[]>(`${this.url}/${clubId}/playlists`, this.getHttpOptions()).pipe(
      catchError((err: any) =>
        {
          console.log(err);
          return throwError(() => new Error('ClubService.getPlaylist(): error: ' + err));
        })
    );
  }

  addPlaylistToClub(clubId: number, pid:number): Observable<Club>{
    return this.http.post<Club>(`${this.url}/${clubId}/playlists/${pid}`, null ,this.getHttpOptions()).pipe(
      catchError((err: any) =>
        {
          console.log(err);
          return throwError(() => new Error('ClubService.addPlaylistToClub(): error: ' + err));
        })
    );
  }

  removePlaylistFromClub(clubId: number, pid:number): Observable<Club>{
    return this.http.delete<Club>(`${this.url}/${clubId}/playlists/${pid}` ,this.getHttpOptions()).pipe(
      catchError((err: any) =>
        {
          console.log(err);
          return throwError(() => new Error('ClubService.removePlaylistToClub(): error: ' + err));
        })
    );
  }

  update(updateClub:Club) : Observable<Club> {
    return this.http.put<Club>(this.url + '/' + updateClub.id ,updateClub,this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => { return new Error("ClubService.update(): error updating club:"  + err); }
          );
        }
      )
    );
  }

}
