import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Club } from '../models/club';

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

}
