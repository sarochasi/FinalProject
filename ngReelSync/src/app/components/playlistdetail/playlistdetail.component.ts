import { Component, inject, TemplateRef } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MediaService } from '../../services/media.service';
import { Media } from '../../models/media';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../models/playlist';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-playlistdetail',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './playlistdetail.component.html',
  styleUrl: './playlistdetail.component.css'
})
export class PlaylistdetailComponent {

  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer
  ) {}

  playlistId: number = 0;
  selectedMediaId: number | null = null;
  mediaList: Media[] = [];
  playlist: Playlist | null = null;
  selected: Media | null = null;
  safeSrc: SafeResourceUrl = '';

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.playlistId = +params['id'];
      this.getPlaylistDetails(this.playlistId);
      this.showPlaylistMedia(this.playlistId);
    });
  }

  sanitizeUrl(url: string) {
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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

  findMediaById(mediaId: number) : void {
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

  reloadMedia(pid: number): void {
    this.mediaService.showPlaylistMedia(pid).subscribe({
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
    this.mediaService.showPlaylistMedia(pid).subscribe({
      next: (mediaList) => {
        console.log('Media loaded sucessfully', mediaList);
        this.mediaList = mediaList;
      },
      error: (err) => {
        console.log("Error loading media in showPlaylistMedia() :" + err);
      }
    })
  }

  updateMedia(editMedia: Media) : void {
    this.mediaService.update(editMedia).subscribe({
     next: (mediaList) => {
       this.reloadMedia(this.playlistId);
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
          this.reloadMedia(this.playlistId);
        },
        error: (kaboom) =>{
          console.log('MediaListComponent.deleteMedia failed');
          console.log(kaboom);
        }

      })
    }

    addSelectedMediaToPlaylist(): void {
      if (this.selected && this.selectedMediaId) {
        const media = this.mediaList.find(m => m.id === this.selectedMediaId);
        if (media) {
          this.playlistService.addMediaToPlaylist(this.selected.id, media.id, media);
        }
      }
    }

}
