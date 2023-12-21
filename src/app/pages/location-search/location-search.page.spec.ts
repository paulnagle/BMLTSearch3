import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationSearchPage } from './location-search.page';

describe('LocationSearchPage', () => {
  let component: LocationSearchPage;
  let fixture: ComponentFixture<LocationSearchPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocationSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
