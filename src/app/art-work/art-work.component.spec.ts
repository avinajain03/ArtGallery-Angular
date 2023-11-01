import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtWorkComponent } from './art-work.component';

describe('ArtWorkComponent', () => {
  let component: ArtWorkComponent;
  let fixture: ComponentFixture<ArtWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtWorkComponent]
    });
    fixture = TestBed.createComponent(ArtWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
