import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostToGoogleComponent } from './post-to-google.component';

describe('PostToGoogleComponent', () => {
  let component: PostToGoogleComponent;
  let fixture: ComponentFixture<PostToGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostToGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostToGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
