import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VirtSearchPage } from './virt-search.page';

describe('VirtSearchPage', () => {
  let component: VirtSearchPage;
  let fixture: ComponentFixture<VirtSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VirtSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
