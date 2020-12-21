import { TestBed } from '@angular/core/testing';

import { DeliveryAgentService } from './delivery-agent.service';

describe('DeliveryAgentService', () => {
  let service: DeliveryAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
