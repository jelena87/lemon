import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedScreenComponent } from './submitted-screen.component';

describe('SubmittedScreenComponent', () => {
  let component: SubmittedScreenComponent;
  let fixture: ComponentFixture<SubmittedScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
