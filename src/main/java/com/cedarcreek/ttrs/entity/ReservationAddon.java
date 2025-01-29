package com.cedarcreek.ttrs.entity;

import jakarta.persistence.*;

@Entity
@Table(name="reservation_addon")
public class ReservationAddon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="quantity")
    private int quantity;

    @Column(name="unit_price")
    private double unitPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id")
    public Reservation reservation;

    @Column(name="addon_id")
    private Long addonId;


    public Long getAddonId() {
        return addonId;
    }

    public void setAddonId(Long addonId) {
        this.addonId = addonId;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    @Override
    public String toString() {
        return "ReservationAddon{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", unitPrice=" + unitPrice +
                ", reservation=" + reservation +
                ", addonId=" + addonId +
                '}';
    }
}
