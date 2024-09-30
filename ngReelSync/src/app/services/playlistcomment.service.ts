import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Playlistcomment } from '../models/playlistcomment';
import { Playlist } from '../models/playlist';

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

  index():Observable<Playlistcomment[]>{
    return this.http.get<Playlistcomment[]>(this.url, this.getHttpOptions()).pipe(
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

  show(cid: number): Observable<Playlistcomment>{
    return this.http.get<Playlistcomment>(this.url + '/' + cid, this.getHttpOptions()).pipe(
      catchError((err:any) => {
        console.log(err);
        return throwError(
          () => new Error('PlaylistCommentService.show(): error showing comment: ' + err)
        );
      })
    );
  }

  create(comment: Playlistcomment): Observable<Playlistcomment>{
    return this.http.post<Playlistcomment>(this.url, comment, this.getHttpOptions()).pipe(
      catchError((err:any) => {
        console.log(err);
        return throwError(
          () => new Error('CommentService.create(): error adding comment: ' + err)
        );
      })
    );
  }

  addCommentToPlaylist(playlistId: number, commentId: number): Observable<Playlist> {
    const url = `${this.baseUrl}/playlists/${playlistId}/comments/${commentId}`;
    return this.http.post<Playlist>(url, {}, this.getHttpOptions());
  }




}
