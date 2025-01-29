import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { teeTimeSelectedGuard } from './tee-time-selected.guard';

describe('teeTimeSelectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => teeTimeSelectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
