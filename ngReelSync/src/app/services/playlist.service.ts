import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Playlist } from '../models/playlist';
import { User } from '../models/user';
import { Media } from '../models/media';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/playlists';

  user: User = new User();

  constructor(private http: HttpClient, private auth: AuthService) { }

  index():Observable<Playlist[]>{
    return this.http.get<Playlist[]>(this.url, this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => { return new Error("TodoService.index(): error retrieving todos:"  + err); }
          );
        }
      )
    );

  }

  create(newPlaylist:Playlist) : Observable<Playlist>{
    return this.http.post<Playlist>(this.url,newPlaylist,this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => { return new Error("TodoService.create(): error creating todo:"  + err); }
          );
        }
      )
    );
  }

  show(pid: number) : Observable<Playlist> {
    return this.http.get<Playlist>(`${this.url}/${pid}`,this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => { return new Error("TodoService.show(): error retrieving todo with an id of " + pid + ": "  + err); }
          );
        }
      )
    );
  }

  showByKeyword(keyword: string) : Observable<Playlist> {
    return this.http.get<Playlist>(`${this.url}/${keyword}`,this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => { return new Error("TodoService.show(): error retrieving todo with an id of " + keyword + ": "  + err); }
          );
      }
    )
  );
  }

  getPlaylistById(playlistId: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.url}/${playlistId}`, this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => new Error(`PlaylistService.getPlaylistById(): error retrieving playlist with an ID of ${playlistId}: ${err}`)
          );
        }
      )
    );
  }


  update(updateTodo:Playlist) : Observable<Playlist> {
    return this.http.put<Playlist>(this.url + '/' + updateTodo.id ,updateTodo,this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => { return new Error("TodoService.update(): error updating todo:"  + err); }
          );
        }
      )
    );
  }

  destroy(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/' + id,this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => { return new Error("TodoService.delete(): error deleting todo:"  + err); }
          );
        }
      )
    );
  }

  addMediaToPlaylist(playlistId: number, mediaId: number): Observable<Playlist> {
    const url = `${this.url}/${playlistId}/media/${mediaId}`;
    return this.http.post<Playlist>(url, {}, this.getHttpOptions());
  }

  searchPlaylists(keyword1: string, keyword2: string): Observable<Set<Playlist>> {
    const url = `${this.url}/search/${keyword1}/${keyword2}`;
    return this.http.get<Set<Playlist>>(url, this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => {return new Error("TodoService.searchPlaylists(): error searching playlist " + err); }
          );
        }
      )
    );
  }

  addToFavorites(playlistId: number): Observable<Playlist> {
    const url = `${this.url}/${playlistId}/favorite`;
    return this.http.post<Playlist>(url, {}, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('PlaylistService.addToFavorites(): error updating favorite status: ' + err));
      })
    );
  }

  removeFromFavorites(playlistId: number): Observable<Playlist> {
    const url = `${this.url}/${playlistId}/favorite`;
    return this.http.delete<Playlist>(url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('PlaylistService.deleteFromFavorites(): error updating favorite status: ' + err));
      })
    );
  }

  loadFavorites() : Observable<Playlist[]> {
    const url = `${this.url}/favorite`;
    return this.http.get<Playlist[]>(url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => new Error('PlaylistService.addToFavorites(): error updating favorite status: ' + err));
      })
    );
  }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  getMediaByPlaylistId(playlistId: number): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.url}/${playlistId}`, this.getHttpOptions());
  }
}
