import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtTabsPage } from './virt-tabs.page';

describe('VirtTabsPage', () => {
  let component: VirtTabsPage;
  let fixture: ComponentFixture<VirtTabsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VirtTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
