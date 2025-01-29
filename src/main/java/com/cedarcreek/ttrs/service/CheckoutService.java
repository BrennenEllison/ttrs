package com.cedarcreek.ttrs.service;

import com.cedarcreek.ttrs.dto.Purchase;
import com.cedarcreek.ttrs.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeReservation(Purchase Purchase);
}
