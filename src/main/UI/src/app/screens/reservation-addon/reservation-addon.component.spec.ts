import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationAddonComponent } from './reservation-addon.component';

describe('ReservationAddonComponent', () => {
  let component: ReservationAddonComponent;
  let fixture: ComponentFixture<ReservationAddonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationAddonComponent]
    });
    fixture = TestBed.createComponent(ReservationAddonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
