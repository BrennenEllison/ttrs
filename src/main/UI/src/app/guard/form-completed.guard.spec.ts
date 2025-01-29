import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formCompletedGuard } from './form-completed.guard';

describe('formCompletedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formCompletedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
