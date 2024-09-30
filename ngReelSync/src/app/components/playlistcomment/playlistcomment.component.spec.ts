import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistcommentComponent } from './playlistcomment.component';

describe('PlaylistcommentComponent', () => {
  let component: PlaylistcommentComponent;
  let fixture: ComponentFixture<PlaylistcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistcommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
