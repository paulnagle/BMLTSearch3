import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoIHaveTheBmltPage } from './do-i-have-the-bmlt.page';

describe('DoIHaveTheBmltPage', () => {
  let component: DoIHaveTheBmltPage;
  let fixture: ComponentFixture<DoIHaveTheBmltPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoIHaveTheBmltPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoIHaveTheBmltPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
