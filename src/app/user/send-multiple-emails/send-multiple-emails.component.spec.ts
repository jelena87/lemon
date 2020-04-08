import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMultipleEmailsComponent } from './send-multiple-emails.component';

describe('SendMultipleEmailsComponent', () => {
  let component: SendMultipleEmailsComponent;
  let fixture: ComponentFixture<SendMultipleEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMultipleEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMultipleEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
