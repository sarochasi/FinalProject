import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';

import { Playlist } from '../models/playlist';
import { PlaylistComment } from '../models/playlistcomment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistcommentService {

  private baseUrl = environment.baseUrl;
  private url = environment.baseUrl + 'api/comments';

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

  index():Observable<PlaylistComment[]>{
    return this.http.get<PlaylistComment[]>(this.url, this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => { return new Error("PlaylistCommentService.index(): error retrieving comments:"  + err); }
          );
        }
      )
    );

  }

  show(cid: number): Observable<PlaylistComment>{
    return this.http.get<PlaylistComment>(this.url + '/' + cid, this.getHttpOptions()).pipe(
      catchError((err:any) => {
        console.log(err);
        return throwError(
          () => new Error('PlaylistCommentService.show(): error showing comment: ' + err)
        );
      })
    );
  }

  create(playlistId: number, comment: PlaylistComment): Observable<PlaylistComment>{
    // return this.http.post<PlaylistComment>(this.url, comment, this.getHttpOptions()).pipe(
    return this.http.post<PlaylistComment>(`${this.baseUrl}api/playlists/${playlistId}/comments`, comment, this.getHttpOptions()).pipe(
      catchError((err:any) => {
        console.log(err);
        return throwError(
          () => new Error('CommentService.create(): error adding comment: ' + err)
        );
      })
    );
  }

  // addCommentToPlaylist(playlistId: number, commentId: number): Observable<Playlist> {
  //   const url = `${this.baseUrl}/playlists/${playlistId}/comments/${commentId}`;
  //   return this.http.post<Playlist>(url, {}, this.getHttpOptions());
  // }




}
