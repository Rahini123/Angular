import { TestBed } from '@angular/core/testing';

import { AgentgroupService } from './agentgroup.service';

describe('AgentgroupService', () => {
  let service: AgentgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
