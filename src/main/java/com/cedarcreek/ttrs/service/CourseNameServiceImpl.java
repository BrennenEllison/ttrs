package com.cedarcreek.ttrs.service;

import com.cedarcreek.ttrs.dao.CourseRepository;
import com.cedarcreek.ttrs.dto.CourseNames;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseNameServiceImpl implements CourseNameService{

    private CourseRepository courseRepository;
    public CourseNameServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public List<CourseNames> convertData() {
        return courseRepository.findCourseNames();
    }
}
