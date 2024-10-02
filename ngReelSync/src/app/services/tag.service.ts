import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Media } from '../models/media';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private baseUrl = environment.baseUrl;
  private url = environment.baseUrl + 'api/tags';

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

  index(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('TagService.index(): error retrieving tag list: ' + err)
        );
      })
    );
  }

  show(tagId: number): Observable<Tag>{
    return this.http.get<Tag>(this.url + '/' + tagId, this.getHttpOptions()).pipe(
      catchError((err:any) => {
        console.log(err);
        return throwError(
          () => new Error('TagService.show(): error showing tag: ' + err)
        );
      })
    );
  }

  create(tag: Tag): Observable<Tag>{
    return this.http.post<Tag>(this.url, tag, this.getHttpOptions()).pipe(
      catchError((err:any) => {
        console.log(err);
        return throwError(
          () => new Error('TagService.create(): error adding tag; ' + err)
        );
      })
    );
  }

  update(updateTag: Tag): Observable<Tag>{
    console.log("Updating: " + updateTag);
    return this.http.put<Tag>(this.url + '/' + updateTag.id ,updateTag,this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log('TagService.update(): error updating tag', err);
        return throwError(
          () => new Error('TagService.update(): error updating tag: ' + err)
        );
      })
    );
  }

  destroy(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`, this.getHttpOptions()).pipe(
      catchError(
        (err:any) => {
          console.error('TagService.destroy(): errror deleteing tag', err);
          return throwError(
            () => new Error('TagService.destroy(): error deleting tag: ' + err)
          );
        }
      )
    );
  }

  addTagToPlaylist(playlistId: number, tagId: number, tag: Tag): Observable<Tag> {
    const url = `${this.url}/${tagId}/playlist/${playlistId}`;
    return this.http.post<Tag>(url, {tag}, this.getHttpOptions());
  }
}
