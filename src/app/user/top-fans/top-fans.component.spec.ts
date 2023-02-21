import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFansComponent } from './top-fans.component';

describe('TopFansComponent', () => {
  let component: TopFansComponent;
  let fixture: ComponentFixture<TopFansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopFansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
