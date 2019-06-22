import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpericalViewComponent } from './emperical-view.component';

describe('EmpericalViewComponent', () => {
  let component: EmpericalViewComponent;
  let fixture: ComponentFixture<EmpericalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpericalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpericalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
