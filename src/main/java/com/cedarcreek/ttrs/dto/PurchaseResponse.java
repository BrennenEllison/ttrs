package com.cedarcreek.ttrs.dto;

public class PurchaseResponse {
    public final String status;

    public PurchaseResponse(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

}
