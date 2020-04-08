import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEmailsComponent } from './upload-emails.component';

describe('UploadEmailsComponent', () => {
  let component: UploadEmailsComponent;
  let fixture: ComponentFixture<UploadEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
