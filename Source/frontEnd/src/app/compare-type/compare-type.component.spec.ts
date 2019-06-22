import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareTypeComponent } from './compare-type.component';

describe('CompareTypeComponent', () => {
  let component: CompareTypeComponent;
  let fixture: ComponentFixture<CompareTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
