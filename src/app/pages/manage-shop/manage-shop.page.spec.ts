import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageShopPage } from './manage-shop.page';

describe('ManageShopPage', () => {
  let component: ManageShopPage;
  let fixture: ComponentFixture<ManageShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageShopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
