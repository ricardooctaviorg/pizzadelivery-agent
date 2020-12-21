import { TestBed } from '@angular/core/testing';

import { CountPendingService } from './count-pending.service';

describe('CountPendingService', () => {
  let service: CountPendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountPendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
