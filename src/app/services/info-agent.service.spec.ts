import { TestBed } from '@angular/core/testing';

import { InfoAgentService } from './info-agent.service';

describe('InfoAgentService', () => {
  let service: InfoAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
