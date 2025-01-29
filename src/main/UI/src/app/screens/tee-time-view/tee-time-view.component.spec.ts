import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeeTimeViewComponent } from './tee-time-view.component';

describe('TeeTimeViewComponent', () => {
  let component: TeeTimeViewComponent;
  let fixture: ComponentFixture<TeeTimeViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeeTimeViewComponent]
    });
    fixture = TestBed.createComponent(TeeTimeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
