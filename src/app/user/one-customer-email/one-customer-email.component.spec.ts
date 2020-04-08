import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCustomerEmailComponent } from './one-customer-email.component';

describe('OneCustomerEmailComponent', () => {
  let component: OneCustomerEmailComponent;
  let fixture: ComponentFixture<OneCustomerEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneCustomerEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCustomerEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
