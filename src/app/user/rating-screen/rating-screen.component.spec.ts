import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingScreenComponent } from './rating-screen.component';

describe('RatingScreenComponent', () => {
  let component: RatingScreenComponent;
  let fixture: ComponentFixture<RatingScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
