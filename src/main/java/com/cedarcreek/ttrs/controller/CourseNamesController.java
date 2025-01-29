package com.cedarcreek.ttrs.controller;

import com.cedarcreek.ttrs.dao.ReservationAddonRepository;
import com.cedarcreek.ttrs.dto.CourseNames;
import com.cedarcreek.ttrs.entity.ReservationAddon;
import com.cedarcreek.ttrs.service.CourseNameServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/course")
public class CourseNamesController {

    private CourseNameServiceImpl courseNameService;

    @Autowired
    ReservationAddonRepository reservationAddonRepository;

    public CourseNamesController(CourseNameServiceImpl courseNameService) {
        this.courseNameService = courseNameService;
    }

    @GetMapping("/names")
    public List<CourseNames> getCourseNames(){
        return courseNameService.convertData();
    }

}
