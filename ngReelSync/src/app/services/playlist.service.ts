import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Playlist } from '../models/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/playlists';


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

  create(newTodo:Playlist) : Observable<Playlist>{
    return this.http.post<Playlist>(this.url,newTodo,this.getHttpOptions()).pipe(
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

  show(todoId: number) : Observable<Playlist> {
    return this.http.get<Playlist>(`${this.url}/${todoId}`,this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => { return new Error("TodoService.show(): error retrieving todo with an id of " + todoId + ": "  + err); }
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

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }
}
