import { TestBed } from '@angular/core/testing';

import { PlaylistcommentService } from './playlistcomment.service';

describe('PlaylistcommentService', () => {
  let service: PlaylistcommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistcommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
