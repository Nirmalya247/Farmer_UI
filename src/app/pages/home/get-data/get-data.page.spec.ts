import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetDataPage } from './get-data.page';

describe('GetDataPage', () => {
  let component: GetDataPage;
  let fixture: ComponentFixture<GetDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
