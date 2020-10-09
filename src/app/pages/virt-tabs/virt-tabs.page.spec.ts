import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VirtTabsPage } from './virt-tabs.page';

describe('VirtTabsPage', () => {
  let component: VirtTabsPage;
  let fixture: ComponentFixture<VirtTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VirtTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
