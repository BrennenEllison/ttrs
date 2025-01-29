import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeeTimeListComponent } from './tee-time-list.component';

describe('TeeTimeListComponent', () => {
  let component: TeeTimeListComponent;
  let fixture: ComponentFixture<TeeTimeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeeTimeListComponent]
    });
    fixture = TestBed.createComponent(TeeTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
