import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtSearchPage } from './virt-search.page';

describe('VirtSearchPage', () => {
  let component: VirtSearchPage;
  let fixture: ComponentFixture<VirtSearchPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VirtSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
