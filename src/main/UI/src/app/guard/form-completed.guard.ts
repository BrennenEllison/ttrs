import { CanActivateFn } from '@angular/router';
import { CheckoutService } from '../services/checkout.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const formCompletedGuard: CanActivateFn = (route, state) => {
  const checkoutService = inject(CheckoutService);
  const router = inject(Router);

  if(checkoutService.getFormStatus()){
    return true;
  }
  else {
    router.navigate(['/tee-time/search']);
    return false;
  }
};
