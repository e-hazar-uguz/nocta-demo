import { TestBed } from '@angular/core/testing';

import { MerchantListService } from './merchant-list.service';

describe('MerchantListService', () => {
  let service: MerchantListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
