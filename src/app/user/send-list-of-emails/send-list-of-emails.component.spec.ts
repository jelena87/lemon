import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendListOfEmailsComponent } from './send-list-of-emails.component';

describe('SendListOfEmailsComponent', () => {
  let component: SendListOfEmailsComponent;
  let fixture: ComponentFixture<SendListOfEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendListOfEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendListOfEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
