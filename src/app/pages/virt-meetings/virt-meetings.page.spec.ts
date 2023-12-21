import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtMeetingsPage } from './virt-meetings.page';

describe('VirtMeetingsPage', () => {
  let component: VirtMeetingsPage;
  let fixture: ComponentFixture<VirtMeetingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VirtMeetingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
