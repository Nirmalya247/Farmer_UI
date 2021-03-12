import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminSellRequestsPage } from './admin-sell-requests.page';

describe('AdminSellRequestsPage', () => {
  let component: AdminSellRequestsPage;
  let fixture: ComponentFixture<AdminSellRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSellRequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSellRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
