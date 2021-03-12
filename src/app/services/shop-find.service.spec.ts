import { TestBed } from '@angular/core/testing';

import { ShopFindService } from './shop-find.service';

describe('ShopFindService', () => {
  let service: ShopFindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopFindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
