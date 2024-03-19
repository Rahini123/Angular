import { TestBed } from '@angular/core/testing';

import { SouceService } from './souce.service';

describe('SouceService', () => {
  let service: SouceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SouceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
