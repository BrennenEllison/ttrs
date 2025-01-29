package com.cedarcreek.ttrs.controller;

import com.cedarcreek.ttrs.dto.Purchase;
import com.cedarcreek.ttrs.dto.PurchaseResponse;
import com.cedarcreek.ttrs.service.CheckoutService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeReservation(@RequestBody Purchase purchase) {
        try {
            PurchaseResponse purchaseResponse = checkoutService.placeReservation(purchase);
            return purchaseResponse;
        } catch (Exception e) {
            System.out.println(e);
            return new PurchaseResponse("error");
        }
    }
}
