import { MediaService } from './../../services/media.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Media } from '../../models/media';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {

  mediaList: Media[] = [];
  selected: Media | null = null;
  newMedia: Media = new Media();
  editMedia: Media | null = null;
  showCreateForm: boolean = false;

  constructor(
    private mediaService: MediaService
  ){}

  ngOnInit(): void{
    this.reloadMedia();
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


}
