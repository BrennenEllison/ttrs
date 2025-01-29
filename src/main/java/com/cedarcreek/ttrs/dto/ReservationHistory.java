package com.cedarcreek.ttrs.dto;

import java.time.LocalDateTime;

public class ReservationHistory {

    private LocalDateTime startTime;
    private int holeCount;
    private String courseName;
    private Double totalPrice;
    private Boolean status;
    private int id;

    public ReservationHistory(LocalDateTime startTime, int holeCount, String courseName, Double totalPrice, Boolean status, int id) {
        this.startTime = startTime;
        this.holeCount = holeCount;
        this.courseName = courseName;
        this.totalPrice = totalPrice;
        this.status = status;
        this.id = id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public int getHoleCount() {
        return holeCount;
    }

    public void setHoleCount(int holeCount) {
        this.holeCount = holeCount;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
