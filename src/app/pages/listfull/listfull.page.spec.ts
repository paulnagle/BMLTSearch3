import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListfullPage } from './listfull.page';

describe('ListfullPage', () => {
  let component: ListfullPage;
  let fixture: ComponentFixture<ListfullPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListfullPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListfullPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
