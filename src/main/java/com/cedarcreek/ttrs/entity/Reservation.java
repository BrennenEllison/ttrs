package com.cedarcreek.ttrs.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id" )
@Entity
@Table(name="reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="player_count")
    private int playerCount;

    @Column(name="total_price")
    private double totalPrice;

    @Column(name="date_created")
    @CreationTimestamp
    private LocalDateTime dateCreated;

    @Column(name="last_updated")
    @UpdateTimestamp
    private LocalDateTime lastUpdated;

    @Column(name="status")
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne
    @JoinColumn(name = "tee_time_id")
    private TeeTime teeTime;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "reservation")
    private Set<ReservationAddon> reservationAddons = new HashSet<>();

    public void addAddon(ReservationAddon item) {
        if(item != null){
            if(reservationAddons == null) {
                reservationAddons = new HashSet<>();
            }
            reservationAddons.add(item);
            item.setReservation(this);
        }
    }

    public Set<ReservationAddon> getReservationAddons() {
        return reservationAddons;
    }

    public void setReservationAddons(Set<ReservationAddon> reservationAddons) {
        this.reservationAddons = reservationAddons;
    }

    public TeeTime getTeeTime() {
        return teeTime;
    }

    public void setTeeTime(TeeTime teeTime) {
        this.teeTime = teeTime;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getPlayerCount() {
        return playerCount;
    }

    public void setPlayerCount(int playerCount) {
        this.playerCount = playerCount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", playerCount=" + playerCount +
                ", totalPrice=" + totalPrice +
                ", dateCreated=" + dateCreated +
                ", lastUpdated=" + lastUpdated +
                ", status=" + status +
                ", customer=" + customer +
                ", teeTime=" + teeTime +
                ", reservationAddons=" + reservationAddons +
                '}';
    }
}
