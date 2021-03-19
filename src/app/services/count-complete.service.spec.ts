import { TestBed } from '@angular/core/testing';

import { CountCompleteService } from './count-complete.service';

describe('CountCompleteService', () => {
  let service: CountCompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountCompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
