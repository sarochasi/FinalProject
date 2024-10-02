import { PlaylistService } from './../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tag } from '../../models/tag';
import { TagService } from '../../services/tag.service';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {

  tags: Tag[] = [];
  playlists: Playlist[] = [];
  newTag: Tag = new Tag();
  selected: Tag | null = null;
  selectedPlaylistId: number = 0;

  constructor(private tagService: TagService,
    private playlistService: PlaylistService
  ) {

  }

  ngOnInit() {
    this.loadTags();
    this.reloadPlaylists();
  }

  loadTags(): void {
    console.log('loadTags() called')
    this.tagService.index().subscribe({
      next: (tags) => {
        this.tags = tags;
        console.log("tags: " + tags);

      },
      error: (err) => {
        console.error(err);
        console.error("Error loading tags");
      }
    });
  }

  reloadPlaylists() {
    this.playlistService.index().subscribe({
      next: (playlists) => {
        this.playlists = playlists;
      },
      error: (fail) => {
        console.error('TagComponent.reloadPlaylists: error retrieving list');
        console.error(fail);
      }
    });
  }

  addTag(newTag: Tag) : void {
    this.tagService.create(newTag).subscribe({
      next: (newClub) => {
        this.loadTags();
        this.newTag = new Tag();
      },
      error: (err) => {
        console.error(err);
        console.error("addTag(): error in subscribe");
      }
    });
  }

  updateTag(editTag: Tag) : void {
    this.tagService.update(editTag).subscribe({
     next: (tag) => {
       this.loadTags();
       this.selected = null;
     },
     error: (err) => {
       console.error(err);
       console.error("editTag(): error in subscribe");
     }
    });
   }

   deleteTag(id: number) : void{
    this.tagService.destroy(id).subscribe({
      next: () => {
        this.loadTags();
      },
      error: (err) => {
        console.error(err);
        console.error("deleteTag(): error in subscribe");
      }
    });
  }

  addTagToPlaylist(playlistId: number, tagId: number | undefined, tag: Tag | null): void {
    if (playlistId && tag && tagId !== undefined) {
      this.tagService.addTagToPlaylist(playlistId, tagId, tag).subscribe({
        next: (updatedPlaylist) => {
          console.log('Tag added to playlist successfully:', updatedPlaylist);
          this.loadTags();
        },
        error: (err) => {
          console.error('Error adding tag to playlist:', err);
        }
      });
    } else {
      console.error('Error: Invalid playlist or tag selection');
    }
  }

}
