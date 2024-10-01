import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubdetailComponent } from './clubdetail.component';

describe('ClubdetailComponent', () => {
  let component: ClubdetailComponent;
  let fixture: ComponentFixture<ClubdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
