import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MySellRequestsPage } from './my-sell-requests.page';

describe('MySellRequestsPage', () => {
  let component: MySellRequestsPage;
  let fixture: ComponentFixture<MySellRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySellRequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MySellRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
