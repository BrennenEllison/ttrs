import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationViewComponent } from './confirmation-view.component';

describe('ConfirmationViewComponent', () => {
  let component: ConfirmationViewComponent;
  let fixture: ComponentFixture<ConfirmationViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationViewComponent]
    });
    fixture = TestBed.createComponent(ConfirmationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
