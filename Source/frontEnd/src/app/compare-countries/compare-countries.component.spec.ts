import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareCountriesComponent } from './compare-countries.component';

describe('CompareCountriesComponent', () => {
  let component: CompareCountriesComponent;
  let fixture: ComponentFixture<CompareCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
