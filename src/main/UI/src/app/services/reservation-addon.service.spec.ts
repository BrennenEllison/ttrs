import { TestBed } from '@angular/core/testing';

import { ReservationAddonService } from './reservation-addon.service';

describe('ReservationAddonService', () => {
  let service: ReservationAddonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationAddonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
