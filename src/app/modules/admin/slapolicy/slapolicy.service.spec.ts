import { TestBed } from '@angular/core/testing';

import { SlapolicyService } from './slapolicy.service';

describe('SlapolicyService', () => {
  let service: SlapolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlapolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
