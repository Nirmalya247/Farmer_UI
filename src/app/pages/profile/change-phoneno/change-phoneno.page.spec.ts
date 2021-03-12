import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangePhonenoPage } from './change-phoneno.page';

describe('ChangePhonenoPage', () => {
  let component: ChangePhonenoPage;
  let fixture: ComponentFixture<ChangePhonenoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhonenoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePhonenoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
