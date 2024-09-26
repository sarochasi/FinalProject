import { Media } from './../models/media';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { DatePipe } from '@angular/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private url = environment.baseUrl + 'api/media';

  constructor(
    private http: HttpClient, private DatePipe: DatePipe, private auth: AuthService
  ) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index(): Observable<Media[]> {
    return this.http.get<Media[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('MediaService.index(): error retrieving media list: ' + err)
        );
      })
    );
  }

  show(mediaId: number): Observable<Media>{
    return this.http.get<Media>(this.url + '/' + mediaId, this.getHttpOptions()).pipe(
      catchError((err:any) => {
        console.log(err);
        return throwError(
          () => new Error('MediaService.show(): error showing media: ' + err)
        );
      })
    );
  }

  create(media: Media): Observable<Media>{
    return this.http.post<Media>(this.url, media).pipe(
      catchError((err:any) => {
        console.log(err);
        return throwError(
          () => new Error('MediaService.create(): error adding media; ' + err)
        );
      })
    );
  }

  update(updateMedia: Media): Observable<Media>{
    console.log(updateMedia);
    return this.http.put<Media>(`${this.url}/${updateMedia.id}`, updateMedia).pipe(
      catchError((err: any) => {
        console.log('MediaService.update(): error updating media', err);
        return throwError(
          () => new Error('MediaService.update(): error updating media: ' + err)
        );
      })
    );
  }

  destroy(id: number){
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(
        (err:any) => {
          console.error('MediaService.destroy(): errror deleteing media', err);
          return throwError(
            () => new Error('MediaService.destroy(): error deleting media: ' + err)
          );
        }
      )
    );
  }

}
