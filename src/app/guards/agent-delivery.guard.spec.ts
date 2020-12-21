import { TestBed } from '@angular/core/testing';

import { AgentDeliveryGuard } from './agent-delivery.guard';

describe('AgentDeliveryGuard', () => {
  let guard: AgentDeliveryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AgentDeliveryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
