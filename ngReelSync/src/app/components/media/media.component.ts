import { MediaService } from './../../services/media.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Media } from '../../models/media';
import { ActivatedRoute, Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {

  title = "Media"

  mediaList: Media[] = [];
  selected: Media | null = null;
  newMedia: Media = new Media();
  editMedia: Media | null = null;
  showCreateForm: boolean = false;

  constructor(

    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
      },
      error: (oopsy) => {
        console.error('Error creating todo;');
        console.log(oopsy);
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

    openEditModal(media: any) {
      this.selected = media;
      const modalElement = document.getElementById('updateMediaModal');
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }


}
