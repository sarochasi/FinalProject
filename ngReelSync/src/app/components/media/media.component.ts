import { MediaService } from './../../services/media.service';
import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Media } from '../../models/media';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons, NgbModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, LoginComponent],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {

  private modalService = inject(NgbModal);
	closeResult = '';
  modalRef : NgbModalRef | null = null;

	open(content: TemplateRef<any>, media: Media) {
    this.loadPlaylists();
		this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
			(playlistId) => {
        this.addMediaToPlaylist(playlistId, media.id, media);
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  isLoggedIn(): boolean {
    return this.authService.checkLogin();
  }

  submitAddToPlaylist(form: NgForm, playlistModal: TemplateRef<any>): void {
    // console.log(form.value.playlist);
    if(this.modalRef) {
      this.modalRef.close(form.value.playlist);
    }
  }

  title = "Media"

  mediaList: Media[] = [];
  selected: Media | null = null;
  newMedia: Media = new Media();
  editMedia: Media | null = null;
  showCreateForm: boolean = false;
  safeSrc: SafeResourceUrl = '';
  playlists: Playlist[] = [];
  selectedPlaylistId: number = 0;

  constructor(
    private playlistService: PlaylistService,
    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private authService:AuthService,
  ){}

  ngOnInit(): void{
    this.reloadMedia();
    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          let mediaIdStr = params.get("mediaId");
          if(mediaIdStr) { //make sure parameter was present
            let mediaId = parseInt(mediaIdStr);
            if(isNaN(mediaId)){ //make sure parameter was a valid number
              this.router.navigateByUrl('notFound');
            } else {
              this.findMediaById(mediaId);
            }
          }
        }
      }
    );
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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

  displayMedia(media: Media): void{
    this.selected = media;
    console.log(this.selected);
  }

  addMedia(newMedia: Media): void{
    this.mediaService.create(newMedia).subscribe({
      next: (createdTodo) => {
        this.reloadMedia();
        this.newMedia = new Media();
        this.mediaList.push(newMedia);
      },
      error: (oopsy) => {
        console.error('Error creating todo;');
        console.log(oopsy);
      }
    });
  }

  addMediaToPlaylist(pid: number, mid : number, media: Media): void {
    this.playlistService.addMediaToPlaylist(pid, mid, media).subscribe({
      next: (success) => {
        console.log(success);
      },
      error: (fail) => {
        console.log(fail);
      }
    });
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

    loadPlaylists(): void {
      this.playlistService.index().subscribe({
        next: (playlists) => {
          this.playlists = playlists;
        },
        error: (kaboom) => {
          console.log('MediaListComponent.loadPlaylists failed');
          console.log(kaboom);
        }
      });
    }

    openEditModal(media: any) {
      this.selected = media;
      const modalElement = document.getElementById('updateMediaModal');
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }


}
