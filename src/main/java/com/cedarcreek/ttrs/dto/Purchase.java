package com.cedarcreek.ttrs.dto;

import com.cedarcreek.ttrs.entity.Customer;
import com.cedarcreek.ttrs.entity.Reservation;
import com.cedarcreek.ttrs.entity.ReservationAddon;
import com.cedarcreek.ttrs.entity.TeeTime;

import java.util.Set;

public class Purchase {

    private Customer customer;
    private TeeTime teeTime;
    private Reservation reservation;
    private Set<ReservationAddon> reservationAddons;

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public TeeTime getTeeTime() {
        return teeTime;
    }

    public void setTeeTime(TeeTime teeTime) {
        this.teeTime = teeTime;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public Set<ReservationAddon> getReservationAddons() {
        return reservationAddons;
    }

    public void setReservationAddons(Set<ReservationAddon> reservationAddons) {
        this.reservationAddons = reservationAddons;
    }

    @Override
    public String toString() {
        return "Purchase{" +
                "customer=" + customer +
                ", teeTime=" + teeTime +
                ", reservation=" + reservation +
                ", reservationAddons=" + reservationAddons +
                '}';
    }
}
