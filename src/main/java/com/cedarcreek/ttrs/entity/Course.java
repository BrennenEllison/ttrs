package com.cedarcreek.ttrs.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;


import java.util.List;


@Entity
@Table(name="course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="course_name")
    private String courseName;

    @Column(name="address")
    private String address;

    @Column(name="phone")
    private String phone;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="course")
    @JsonManagedReference
    private List<TeeTime> TeeTimeSet;

    public List<TeeTime> getTeeTimeSet() {
        return TeeTimeSet;
    }

    public void setTeeTimeSet(List<TeeTime> teeTimeSet) {
        TeeTimeSet = teeTimeSet;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
