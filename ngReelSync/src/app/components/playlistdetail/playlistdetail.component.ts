import { Component } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MediaService } from '../../services/media.service';
import { Media } from '../../models/media';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-playlistdetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlistdetail.component.html',
  styleUrl: './playlistdetail.component.css'
})
export class PlaylistdetailComponent {


  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private mediaService: MediaService
  ) {}

  playlistId: number = 0;
  mediaList: Media[] = [];
  playlist: Playlist | null = null;
  selected: Media | null = null;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.playlistId = +params['id'];
      this.getPlaylistDetails(this.playlistId);
      this.showPlaylistMedia(this.playlistId);
    });
  }

  getPlaylistDetails(pid: number): void {
    this.playlistService.getPlaylistById(pid).subscribe({
      next: (playlist) => {
        this.playlist = playlist;
        console.log('Playlist loaded successfully', this.playlist);
      },
      error: (err) => {
        console.log("Error loading playlist in getPlaylistDetails() :" + err);
      }
    });
  }

  findMediaById(mediaId: number) : void{
    this.mediaService.show(mediaId).subscribe({
      next:(media) => {
        this.selected = media;

      },
      error: (err) => {
        this.router.navigateByUrl('notFound');
        console.error(err);
        console.error('Error in subcribing for finding Todo by id')
      }
    })
  }

  reloadMedia() {
    this.mediaService.index().subscribe({
      next: (mediaList) => {
        this.mediaList = mediaList;
      },
      error: (fail) => {
        console.error('MediaComponent.reloadMedia: error retrieving list');
        console.error(fail);
      }
    });
  }

  showPlaylistMedia(pid: number): void {
    this.playlistService.getMediaByPlaylistId(pid).subscribe({
      next: (media) => {
        console.log('Media loaded sucessfully', media);
        this.reloadMedia();
      },
      error: (err) => {
        console.log("Error loading media in showPlaylistMedia() :" + err);
      }
    })
  }

  updateMedia(editMedia: Media) : void {
    this.mediaService.update(editMedia).subscribe({
     next: (mediaList) => {
       this.reloadMedia();
       this.selected = null;
     },
     error: (err) => {
       console.error(err);
       console.error("error in subscribe");
     }
    });
   }

    deleteMedia(mediaId: number): void{
      this.mediaService.destroy(mediaId).subscribe({
        next: () => {
          this.reloadMedia();
        },
        error: (kaboom) =>{
          console.log('MediaListComponent.deleteMedia failed');
          console.log(kaboom);
        }

      })
    }

}
