import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderMapComponent } from './render-map.component';

describe('RenderMapComponent', () => {
  let component: RenderMapComponent;
  let fixture: ComponentFixture<RenderMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
