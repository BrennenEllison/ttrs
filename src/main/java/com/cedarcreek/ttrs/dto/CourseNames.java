package com.cedarcreek.ttrs.dto;

public class CourseNames {
    private Long id;
    private String courseName;

    public CourseNames(Long id, String courseName) {
        this.id = id;
        this.courseName = courseName;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

}
