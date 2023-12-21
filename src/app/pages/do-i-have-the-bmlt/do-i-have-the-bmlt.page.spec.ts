import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoIHaveTheBmltPage } from './do-i-have-the-bmlt.page';

describe('DoIHaveTheBmltPage', () => {
  let component: DoIHaveTheBmltPage;
  let fixture: ComponentFixture<DoIHaveTheBmltPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DoIHaveTheBmltPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
