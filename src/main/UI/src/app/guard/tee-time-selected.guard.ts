import { CanActivateFn } from '@angular/router';
import { CartService } from '../services/cart.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const teeTimeSelectedGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);

  if(cartService.getTeeTimeStatus()){
    return true;
  }
  else {
    router.navigate(['/tee-time/search']);
    return false;
  }
};
