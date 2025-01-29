package com.cedarcreek.ttrs.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;


import java.time.LocalDateTime;


@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id" )
@Entity
@Table(name="tee_time")
public class TeeTime {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Long id;

        @Column(name="start_time")
        private LocalDateTime startTime;

        @Column(name="hole_count")
        private int holeCount;

        @Column(name="booking_status")
        private int bookingStatus;

        @Column(name="unit_price")
        private double unitPrice;

        @ManyToOne
        @JoinColumn(name="course_id", nullable = false)
        @JsonBackReference
        private Course course;

        @ManyToOne
        @JoinColumn(name = "tee_time_category_id", nullable = false)
        private TeeTimeCategory teeTimeCategory;

        @OneToOne
        @PrimaryKeyJoinColumn
        private Reservation reservation;

        public TeeTime(){};

        public TeeTime(LocalDateTime startTime, int holeCount, int bookingStatus, double unitPrice, Course course, TeeTimeCategory twilightCategory) {
                this.startTime = startTime;
                this.holeCount = holeCount;
                this.bookingStatus = bookingStatus;
                this.unitPrice = unitPrice;
                this.course = course;
                this.teeTimeCategory = twilightCategory;
        }

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
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

        public int getBookingStatus() {
                return bookingStatus;
        }

        public void setBookingStatus(int bookingStatus) {
                this.bookingStatus = bookingStatus;
        }

        public TeeTimeCategory getTeeTimeCategory() {
                return teeTimeCategory;
        }

        public void setTeeTimeCategory(TeeTimeCategory teeTimeCategory) {
                this.teeTimeCategory = teeTimeCategory;
        }

        public Course getCourse() {
                return course;
        }

        public void setCourse(Course course) {
                this.course = course;
        }

        public double getUnitPrice() {
                return unitPrice;
        }

        public void setUnitPrice(double unitPrice) {
                this.unitPrice = unitPrice;
        }


}
